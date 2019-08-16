import Gittr from "../../gittr";

export default class Handlers {

    public handlers: { [s: string]: () => void; };

    constructor(gittr: Gittr) {
        this.handlers = {
            commit: () => {},
            prefs: () => {},
            list: () => {},
            search: () => {},
            version: () => {}
        };
    }

}