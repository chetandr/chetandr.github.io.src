import {Subject} from "rxjs";

const CaptureStore = new Subject();
CaptureStore.next("INIT");

export default CaptureStore;
