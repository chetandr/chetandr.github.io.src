import { AsyncSubject } from "rxjs";

const CarDataStore = new AsyncSubject();
CarDataStore.next({ sub: "pre" });

export default CarDataStore;
