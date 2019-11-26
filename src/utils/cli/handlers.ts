import Gittr from "../../gittr";

export default class Handlers {

    public handlers: { [s: string]: () => void; };

    constructor(gittr: Gittr) {
        this.handlers = {
            commit: () => { console.log(`commit called`) },
            reconfig: () => { gittr.reconfig() },
            list: () => { gittr.list() },
            search: () => { gittr.search() },
            about: () => { gittr.about(); }
        };
    }

}