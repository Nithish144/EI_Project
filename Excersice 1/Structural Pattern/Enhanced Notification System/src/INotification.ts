export interface INotification {
  send(to: string, message: string): void;
}
