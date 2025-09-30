import { Logger } from "./Logger";

export interface Observer {
    notify(msg: string): void;
}

export class ConflictNotifier implements Observer {
    notify(msg: string) {
        Logger.warn(msg);
    }
}
