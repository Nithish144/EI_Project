import * as fs from "fs";
import { Logger } from "./Logger";
import { Task } from "./Task";
import { TaskFactory } from "./TaskFactory";
import { Observer } from "./Observer";
import { Priority } from "./Priority";

export class ScheduleManager {
    private static instance: ScheduleManager;
    private tasks: { [id: number]: Task } = {};
    private observers: Observer[] = [];
    private idCounter = 1;
    private storageFile = "tasks.json";

    private constructor() {
        this.loadTasks();
    }

    static getInstance(): ScheduleManager {
        if (!this.instance) this.instance = new ScheduleManager();
        return this.instance;
    }

    addObserver(obs: Observer) {
        this.observers.push(obs);
    }

    private notifyObservers(msg: string) {
        for (const obs of this.observers) obs.notify(msg);
    }

    private saveTasks() {
        try {
            fs.writeFileSync(this.storageFile, JSON.stringify(this.tasks, null, 2));
        } catch (err: unknown) {
            if (err instanceof Error) Logger.error("Failed to save tasks: " + err.message);
        }
    }

    private loadTasks() {
        if (!fs.existsSync(this.storageFile)) return;
        try {
            const raw = fs.readFileSync(this.storageFile, "utf-8");
            const loaded = JSON.parse(raw);
            for (const key in loaded) {
                const t = loaded[key];
                this.tasks[key] = new Task(t.id, t.description, t.startTime, t.endTime, t.priority, t.completed);
                if (t.id >= this.idCounter) this.idCounter = t.id + 1;
            }
        } catch (err: unknown) {
            if (err instanceof Error) Logger.error("Failed to load tasks: " + err.message);
        }
    }

    addTask(desc: string, start: string, end: string, priority: string) {
        try {
            const task = TaskFactory.create(this.idCounter, desc, start, end, priority);
            for (const existing of Object.values(this.tasks)) {
                if (task.startTime < existing.endTime && task.endTime > existing.startTime) {
                    this.notifyObservers(`"${desc}" conflicts with "${existing.description}"`);
                    return;
                }
            }
            this.tasks[this.idCounter] = task;
            Logger.log(`Task "${task.description}" added Successfully with ID ${task.id}`);
            this.idCounter++;
            this.saveTasks();
        } catch (err: unknown) {
            if (err instanceof Error) Logger.error(err.message);
        }
    }

    viewTasks(priorityFilter?: string) {
        let tasksArray = Object.values(this.tasks);
        if (priorityFilter) {
            const normalized = priorityFilter.trim().toLowerCase();
            tasksArray = tasksArray.filter(t => t.priority.toLowerCase() === normalized);
        }
        tasksArray.sort((a, b) => a.startTime - b.startTime);
        if (tasksArray.length === 0) {
            Logger.log("No tasks scheduled for the day.");
            return;
        }
        for (const t of tasksArray) {
            Logger.log(`[ID ${t.id}] ${this.fmtTime(t.startTime)} - ${this.fmtTime(t.endTime)}: ${t.description} [${t.priority}] ${t.completed ? "(Done)" : ""}`);
        }
    }

    private fmtTime(minutes: number): string {
        const h = Math.floor(minutes / 60).toString().padStart(2, "0");
        const m = (minutes % 60).toString().padStart(2, "0");
        return `${h}:${m}`;
    }

    removeTask(id: number) {
        if (!this.tasks[id]) {
            Logger.error(`Task not found: ID ${id}`);
            return;
        }
        delete this.tasks[id];
        Logger.log(`Task ID ${id} removed`);
        this.saveTasks();
    }

    updateTask(id: number, desc: string, start: string, end: string, priority: string) {
        if (!this.tasks[id]) {
            Logger.error(`Task not found: ID ${id}`);
            return;
        }
        try {
            const updated = TaskFactory.create(id, desc, start, end, priority);
            for (const existing of Object.values(this.tasks)) {
                if (existing.id === id) continue;
                if (updated.startTime < existing.endTime && updated.endTime > existing.startTime) {
                    this.notifyObservers(`"${desc}" conflicts with "${existing.description}"`);
                    return;
                }
            }
            this.tasks[id] = updated;
            Logger.log(`Task ID ${id} updated to "${desc}"`);
            this.saveTasks();
        } catch (err: unknown) {
            if (err instanceof Error) Logger.error(err.message);
        }
    }

    markTaskDone(id: number) {
        if (!this.tasks[id]) {
            Logger.error(`Task not found: ID ${id}`);
            return;
        }
        this.tasks[id].completed = true;
        Logger.log(`Task ID ${id} marked done`);
        this.saveTasks();
    }
}
