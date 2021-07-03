import { ReplaySubject } from "rxjs";

const ThemeStore = new ReplaySubject(1);
// ThemeStore.next(JSON.parse(sessionStorage.getItem("ThemeStore")));
// ThemeStore.complete();
export default ThemeStore;
