import { Priority } from "./Priority";

export class Task {
    constructor(
        public readonly id: number,
        public description: string,
        public startTime: number,
        public endTime: number,
        public priority: Priority,
        public completed: boolean = false
    ) {}
}
