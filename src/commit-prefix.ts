import * as Fs from 'fs';
import * as Path from 'path';
import * as PathExists from 'path-exists';

import { Logger, LogSeverity } from './utils/logger';
import { PrefixModel, PrefixItemModel } from './models';

/**
 * Class for managing and retrieving the correct commit message prefix if Udacity/commit prefixes are enabled.
 * 
 * @export
 * @class CommitPrefix
 */
export default class CommitPrefix {

    private prefix: PrefixModel;
    private api: any;

    public CommitPrefix(api: any) {
        this.api = api;
    }
    
    /**
     * Fetches prefixes from local or over the server to get the updated prefixes for commit messsages.
     * 
     * @returns {Promise<PrefixModel>} - a JSON object containing all the prefixes (Udacity and custom).
     * @memberof CommitPrefix
     */
    public async getPrefixes(): Promise<PrefixModel> {

        // If loaded locally, display that instead
        if (this.prefix) {
            return this.prefix;
        }

        const cachePath: string = this.getCachePath();
        if (!this.isCacheAvailable()) {
            const prefixJson: PrefixModel = await (this.getPublicPrefixes()) as PrefixModel;
            this.prefix = prefixJson;
            this.createCache(cachePath, prefixJson);
            return prefixJson;
        }
        const cache: PrefixModel = await (this.getCachedPrefixes(cachePath)) as PrefixModel;
        this.prefix = cache;
        return cache;
    }

    /**
     * Typically run when app first gets configured, downloads sample list of prefixes from repository.
     * 
     * @private
     * @returns {Promise<any>} - promise containing JSON object of prefixes.
     * @memberof CommitPrefix
     */
    private getPublicPrefixes(): Promise<any> {
        try {
            const response: any = this.api.request({
                method: 'GET',
                url: '/src/data/prefixes.json'
            });
            return response.data.prefixes;
        } catch (e) {
            Logger.log(`Unable to fetch prefixes from server. Error: ${e}`, LogSeverity.ERROR);
            return Promise.reject();
        }
    }

    /**
     * Returns file path of cached prefix data.
     * 
     * @param path - The file path of commit prefixes.
     */
    private getCachedPrefixes(path: string): Promise<any> {
        // TODO: Explore possibility of seeing if Fs.readFileSync(path).toJSON(); works
        if (!this.isCacheAvailable()) {
            return Promise.reject();
        }
        return Promise.resolve(JSON.parse(Fs.readFileSync(path).toString()));
    }

    /**
     * Checks if prefix cache has been written.
     * 
     * @private
     * @returns {boolean} 
     * @memberof CommitPrefix
     */
    private isCacheAvailable(): boolean {
        return PathExists.sync(this.getCachePath());
    }

    /**
     * Returns the path of cached prefixes.
     * 
     * @private
     * @returns {string} - path to where the cache is located.
     * @memberof CommitPrefix
     */
    private getCachePath(): string {
        const home = process.env.HOME || process.env.USERPROFILE;
        return Path.join(home, '.gittr', 'prefix.json');
    }

    /**
     * Caches the prefixes fetched from the server or updated by the user.
     * 
     * @param path - The path of the prefix cache.
     * @param data - The JSON data corresponding to prefix entries.
     */
    private createCache(path: string, data: any): void {
        const cacheDir: string = Path.dirname(path);
        if (data) {
            if (!PathExists.sync(cacheDir)) {
                Fs.mkdirSync(cacheDir);
            }
            Fs.writeFileSync(path, JSON.stringify(data));
        }
    }
}