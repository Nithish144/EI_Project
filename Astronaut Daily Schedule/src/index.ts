import { ScheduleManager } from "./ScheduleManager";
import { ConflictNotifier } from "./Observer";
import { Menu } from "./Menu";

const schedule = ScheduleManager.getInstance();
schedule.addObserver(new ConflictNotifier());
new Menu(schedule).show();
