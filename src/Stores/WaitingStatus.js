import {Subject} from "rxjs";

const WaitingStatus = new Subject();
WaitingStatus.next(false);
export default WaitingStatus;
