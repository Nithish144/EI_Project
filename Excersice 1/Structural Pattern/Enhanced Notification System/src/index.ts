import * as readline from "readline";
import { BaseNotification } from "./BaseNotification";
import { EmailDecorator, SmsDecorator, PushDecorator } from "./Decorators";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function menu() {
  console.log("\n==== ENHANCED NOTIFICATION ====");
  console.log("1. Base Notification");
  console.log("2. Base + Email");
  console.log("3. Base + SMS + Email");
  console.log("4. Base + Email + SMS + Push");
  console.log("5. Exit");
  rl.question("Choose: ", (choice) => {
    rl.question("Enter recipient: ", (to) => {
      rl.question("Enter message: ", (msg) => {
        let notification = new BaseNotification();
        switch (choice) {
          case "2": notification = new EmailDecorator(notification); break;
          case "3": notification = new SmsDecorator(new EmailDecorator(notification)); break;
          case "4": notification = new PushDecorator(new SmsDecorator(new EmailDecorator(notification))); break;
          case "1": break;
          case "5": rl.close(); return;
          default: console.log("Invalid"); menu(); return;
        }
        notification.send(to, msg);
        menu();
      });
    });
  });
}

menu();
