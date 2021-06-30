import {Subject} from "rxjs";

const captureState = new Subject();
captureState.next("INIT");

export default captureState;
