"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cached_service_1 = require("./cached-service");
/**
 * Class for managing and retrieving emojis corresponding to each type of commit.
 *
 * @export
 * @class EmojiService
 */
class EmojiService extends cached_service_1.CachedService {
    constructor(config) {
        super(config);
    }
    getEndpoint() {
        return this.config.getEmojiUpdateUrl();
    }
    plural() {
        return 'emojis';
    }
}
exports.EmojiService = EmojiService;
