import { Task } from "./Task";
import { Priority } from "./Priority";

export class TaskFactory {
    static create(id: number, desc: string, start: string, end: string, priorityInput: string): Task {
        const description = desc.trim().slice(0, 100);
        const startTime = this.parseTime(start);
        const endTime = this.parseTime(end);

        if (startTime === null || endTime === null)
            throw new Error("Invalid time format. Use HH:MM.");
        if (endTime <= startTime)
            throw new Error("End time must be after start time.");

        const normalized = priorityInput.trim().toLowerCase();
        const priority = Object.values(Priority).find(p => p.toLowerCase() === normalized);
        if (!priority) throw new Error(`Invalid priority: ${priorityInput}`);

        return new Task(id, description, startTime, endTime, priority);
    }

    private static parseTime(str: string): number | null {
        const parts = str.split(":");
        if (parts.length !== 2) return null;
        const h = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
        return h * 60 + m;
    }
}
