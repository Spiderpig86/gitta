import Gittr from "../../gittr";
import { Commands } from "../constants";

export default class Handlers {

    public handlers: { [s: string]: () => void; };

    constructor(gittr: Gittr) {
        this.handlers = {
            [Commands.COMMIT]: () => { gittr.commit() },
            [Commands.RECONFIG]: () => { gittr.reconfig() },
            [Commands.LIST]: () => { gittr.list() },
            [Commands.SEARCH]: () => { gittr.search() },
            [Commands.UPDATE]: () => { gittr.update() },
            [Commands.VERSION]: () => { gittr.version(); }
        };
    }

}