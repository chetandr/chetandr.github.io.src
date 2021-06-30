import {Subject} from "rxjs";

const carDataStore = new Subject();
carDataStore.next({sub: "pre"});

export default carDataStore;
