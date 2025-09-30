import * as fs from "fs";
import * as path from "path";

export class Logger {
    private static logFile = path.join(__dirname, "..", "app.log");

    static init() {
        try {
            if (!fs.existsSync(this.logFile)) fs.writeFileSync(this.logFile, "");
        } catch (err) {
            console.error("Failed to initialize log file:", err);
        }
    }

    static log(msg: string) {
        this.write("INFO", msg);
    }

    static warn(msg: string) {
        this.write("WARN", msg);
    }

    static error(msg: string) {
        this.write("ERROR", msg);
    }

    private static write(level: string, msg: string) {
        const timestamp = new Date().toISOString();
        const logMsg = `[${timestamp}] [${level}] ${msg}`;
        console.log(logMsg);
        try {
            fs.appendFileSync(this.logFile, logMsg + "\n");
        } catch (err) {
            console.error("Failed to write to log file:", err);
        }
    }
}

Logger.init();
