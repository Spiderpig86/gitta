import axios from 'axios';
import * as fs from 'fs';
import * as ora from 'ora';
import * as path from 'path';
import * as pathExists from 'path-exists';

import { Config } from '../utils/config';
import { Logger, LogSeverity } from '../utils/logger';
import { Data } from '../models';

/**
 * Generic caching service for fetching the latest models.
 *
 * @export
 * @abstract
 * @class CachedService
 * @template E
 * @template T
 */
export abstract class CachedService<E, T extends Data<E>> {
    protected config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * Fetch {@link T} models.
     * It is fetched from cache if it exists, otherwise it is fetched from the user specified remote.
     *
     * @param forceUpdate ignore locally stored {@link T} config file and fetch from remote.
     * @param mergeCustom fetch new defaults from remote, but merge in custom {@link T} models.
     */
    public async get(forceUpdate: boolean = false, mergeCustom: boolean = true): Promise<T> {
        let cached = await this.getCached();
        let data = null;

        if (forceUpdate || !cached) {
            data = await this.fetchData();

            if (forceUpdate && mergeCustom) {
                data = {
                    ...data,
                    custom: cached.custom,
                };
            }
        }
        data = data || cached;

        this.writeCache(data);
        return data;
    }

    /**
     * Get cached data. Return null if nothing is cached.
     */
    private getCached(): Promise<T> {
        if (!pathExists.sync(this.getCachePath())) {
            return Promise.reject();
        }

        return Promise.resolve(JSON.parse(fs.readFileSync(this.getCachePath()).toString()));
    }

    /**
     * Fetch {@link T} from remote server.
     */
    private async fetchData() {
        const loader = ora(`Updating ${this.plural()}...`).start();

        try {
            const response = await axios.get<T>(this.getEndpoint());
            loader.succeed(`✅ Succeeded fetching ${this.plural()}!`);
            return response.data;
        } catch (e) {
            Logger.log(
                `Unable to fetch ${this.plural()} from url: ${this.getEndpoint()}. Please reconfigure it to the correct one. ${e}`,
                LogSeverity.ERROR
            );
            loader.fail(`❌ Failed fetching ${this.plural()}.`);
            return null;
        }
    }

    /**
     * Persist fetched data from remote.
     *
     * @param data model to persist on disk.
     */
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
