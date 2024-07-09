"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cached_service_1 = require("./cached-service");
/**
 * Class for managing and retrieving the correct commit message prefix if Conventional Commits prefixes are enabled.
 * https://www.conventionalcommits.org/en/v1.0.0/#summary
 *
 * @export
 * @class PrefixService
 */
class PrefixService extends cached_service_1.CachedService {
    constructor(config) {
        super(config);
    }
    getEndpoint() {
        return this.config.getPrefixUpdateUrl();
    }
    plural() {
        return `prefixes`;
    }
}
exports.PrefixService = PrefixService;
