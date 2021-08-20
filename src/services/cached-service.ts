import axios from 'axios';
import * as fs from 'fs';
import ora = require('ora');
import * as path from 'path';
import * as pathExists from 'path-exists';

import { Config } from '../utils/config';
import { Logger, LogSeverity } from '../utils/logger';

interface Data<T> {
    default: T[];
    custom: T[];
}

export abstract class CachedService<T extends Data<T>> {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public async get(forceUpdate: boolean = false, mergeCustom: boolean = true): Promise<T> {
        const cached = this.getCached();
        let data = null;

        if (forceUpdate || !cached) {
            data = this.fetchData();

            if (forceUpdate && mergeCustom) {
                data = {
                    ...data,
                    custom: cached.custom,
                };
            }
        }

        this.writeCache(data);
        return data;
    }

    private getCached(): T {
        if (!pathExists.sync(this.getCachePath())) {
            return null;
        }

        return JSON.parse(fs.readFileSync(this.getCachePath()).toString());
    }

    private async fetchData() {
        const loader = ora(`Updating ${this.plural()}...`).start();

        try {
            const response = await axios.get<T>(this.getEndpoint());
            loader.succeed(`✅ Succeeded fetching ${this.plural()}!`)
            return response.data;
        } catch (e) {
            Logger.log(
                `Unable to fetch ${this.plural()} from url: ${this.getEndpoint()}. Please reconfigure it to the correct one. ${e}`,
                LogSeverity.ERROR
            );
            loader.fail(`❌ Failed fetching ${this.plural()}.`)
            return null;
        }
    }

    private writeCache(data: T) {
        if (!data) {
            return;
        }

        const directory = path.dirname(this.getCachePath());
        if (!pathExists.sync(directory)) {
            fs.mkdirSync(directory);
        }
        fs.writeFileSync(this.getCachePath(), JSON.stringify(data, null, 4));
    }

    protected abstract getEndpoint(): string;
    protected abstract getCachePath(): string;
    protected abstract plural(): string;
}
