import { ReplaySubject } from "rxjs";
import { getFromStore } from "./ustils";

const AssessmentTypeStore$ = new ReplaySubject();
AssessmentTypeStore$.next(getFromStore("assessmentType"));
export default AssessmentTypeStore$;
