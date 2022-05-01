import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { <%= classify(name) %>Store, <%= classify(name) %>State } from "./<%= dasherize(name) %>.store";

@Injectable()
export class <%= classify(name) %>Query extends Query<<%= classify(name) %>State> {
    constructor(store: <%= classify(name) %>Store) {
        super(store);
    }
}
