import { ReplaySubject } from "rxjs";
import { getFromStore } from "./ustils";
const SelectedCarParts$ = new ReplaySubject(1);
SelectedCarParts$.next(JSON.parse(getFromStore("carParts")));

export default SelectedCarParts$;
