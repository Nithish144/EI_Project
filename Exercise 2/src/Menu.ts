import * as readlineSync from "readline-sync";
import { Logger } from "./Logger";
import { ScheduleManager } from "./ScheduleManager";

function askMandatory(prompt: string): string {
    const value = readlineSync.question(prompt).trim();
    if (!value) {
        Logger.warn("This field is required. Please enter a value.");
        return askMandatory(prompt);
    }
    return value;
}

export class Menu {
    constructor(private schedule: ScheduleManager) {}

    show() {
        console.log(`
=== Astronaut Schedule ===
1. Add Task
2. View All Tasks
3. View Tasks by Priority
4. Remove Task
5. Update Task
6. Mark Done
7. Exit
        `);

        const choice = askMandatory("Choose: ");

        try {
            switch (choice) {
                case "1":
                    this.schedule.addTask(
                        askMandatory("Desc: "),
                        askMandatory("Start (HH:MM): "),
                        askMandatory("End (HH:MM): "),
                        askMandatory("Priority (Low|Medium|High): ")
                    );
                    break;
                case "2":
                    this.schedule.viewTasks();
                    break;
                case "3":
                    const priority = askMandatory("Priority to filter (Low|Medium|High): ");
                    this.schedule.viewTasks(priority);
                    break;
                case "4":
                    this.schedule.removeTask(Number(askMandatory("Task ID to remove: ")));
                    break;
                case "5":
                    this.schedule.updateTask(
                        Number(askMandatory("Task ID to update: ")),
                        askMandatory("New desc: "),
                        askMandatory("Start (HH:MM): "),
                        askMandatory("End (HH:MM): "),
                        askMandatory("Priority (Low|Medium|High): ")
                    );
                    break;
                case "6":
                    this.schedule.markTaskDone(Number(askMandatory("Task ID to mark done: ")));
                    break;
                case "7":
                    Logger.log("Exiting");
                    process.exit(0);
                default:
                    Logger.error("Invalid choice");
            }
        } catch (err: unknown) {
            if (err instanceof Error) Logger.error("Unexpected error: " + err.message);
        }

        setImmediate(() => this.show());
    }
}
