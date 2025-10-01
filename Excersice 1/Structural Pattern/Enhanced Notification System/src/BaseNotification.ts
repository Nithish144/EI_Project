import { INotification } from "./INotification";
export class BaseNotification implements INotification {
  send(to: string, message: string): void {
    console.log(`Base Notification to ${to}: ${message}`);
  }
}
