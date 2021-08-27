import * as Path from 'path';

import { PrefixModel, PrefixItemModel } from '../models';
import { CachedService } from './cached-service';
import { Config } from '../utils/config';
import { isDevelopment } from '../utils/functions';

/**
 * Class for managing and retrieving the correct commit message prefix if Udacity/commit prefixes are enabled.
 *
 * @export
 * @class PrefixService
 */
export class PrefixService extends CachedService<PrefixItemModel, PrefixModel> {
    constructor(config: Config) {
        super(config);
    }

    protected getEndpoint(): string {
        return this.config.getPrefixUpdateUrl();
    }

    protected plural(): string {
        return `prefixes`;
    }
}
