"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs = require("fs");
const ora = require("ora");
const path = require("path");
const pathExists = require("path-exists");
const logger_1 = require("../utils/logger");
const functions_1 = require("../utils/functions");
/**
 * Generic caching service for fetching the latest models.
 *
 * @export
 * @abstract
 * @class CachedService
 * @template E
 * @template T
 */
class CachedService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Fetch {@link T} models.
     * It is fetched from cache if it exists, otherwise it is fetched from the user specified remote.
     *
     * @param forceUpdate ignore locally stored {@link T} config file and fetch from remote.
     * @param mergeCustom fetch new defaults from remote, but merge in custom {@link T} models.
     */
    get(forceUpdate = false, mergeCustom = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cached = yield this.getCached();
                let data = null;
                if (forceUpdate || !cached) {
                    data = yield this.fetchData();
                    if (forceUpdate && mergeCustom) {
                        data = Object.assign({}, data, { custom: cached.custom });
                    }
                }
                data = data || cached;
                this.writeCache(data);
                return data;
            }
            catch (e) {
                logger_1.Logger.log(e, logger_1.LogSeverity.ERROR);
                return null;
            }
        });
    }
    /**
     * Get cached data. Return null if nothing is cached.
     */
    getCached() {
        if (!pathExists.sync(this.getCachePath())) {
            logger_1.Logger.log(`No cache file found...`, logger_1.LogSeverity.INFO);
            return null;
        }
        return Promise.resolve(JSON.parse(fs.readFileSync(this.getCachePath()).toString()));
    }
    /**
     * Fetch {@link T} from remote server.
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const loader = ora(`Updating ${this.plural()}...`).start();
            try {
                const response = yield axios_1.default.get(this.getEndpoint());
                loader.succeed(`Succeeded fetching ${this.plural()}!`);
                return response.data;
            }
            catch (e) {
                loader.fail(`Failed fetching ${this.plural()}.`);
                throw new Error(`Unable to fetch ${this.plural()} from url: ${this.getEndpoint()}. Please reconfigure it to the correct one. ${e}`);
            }
        });
    }
    /**
     * Persist fetched data from remote.
     *
     * @param data model to persist on disk.
     */
    writeCache(data) {
        if (!data) {
            return;
        }
        const directory = path.dirname(this.getCachePath());
        if (!pathExists.sync(directory)) {
            fs.mkdirSync(directory);
        }
        fs.writeFileSync(this.getCachePath(), JSON.stringify(data, null, 4));
    }
    getCachePath() {
        return path.join(functions_1.getCacheDirectory(), `${this.plural()}.json`);
    }
}
exports.CachedService = CachedService;
