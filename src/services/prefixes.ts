import { PrefixModel, PrefixItemModel } from '../models';
import { CachedService } from './cached-service';
import { Config } from '../utils/config';

/**
 * Class for managing and retrieving the correct commit message prefix if Conventional Commits prefixes are enabled.
 * https://www.conventionalcommits.org/en/v1.0.0/#summary
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
