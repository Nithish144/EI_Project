import { INotification } from "./INotification";
export class EmailDecorator implements INotification {
  constructor(private wrappee: INotification) {}
  send(to: string, message: string): void {
    this.wrappee.send(to, message);
    console.log(`Email sent to ${to}: ${message}`);
  }
}
export class SmsDecorator implements INotification {
  constructor(private wrappee: INotification) {}
  send(to: string, message: string): void {
    this.wrappee.send(to, message);
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
export class PushDecorator implements INotification {
  constructor(private wrappee: INotification) {}
  send(to: string, message: string): void {
    this.wrappee.send(to, message);
    console.log(`Push notification sent to ${to}: ${message}`);
  }
}
