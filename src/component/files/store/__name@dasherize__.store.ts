import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface <%= classify(name) %>State {}

const initialState: <%= classify(name) %>State = {};

@StoreConfig({ name: "<%= dasherize(name) %>", resettable: true })
@Injectable()
export class <%= classify(name) %>Store extends Store<<%= classify(name) %>State> {
    constructor() {
        super(initialState);
    }
}
