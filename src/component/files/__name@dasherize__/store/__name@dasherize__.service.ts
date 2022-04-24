import { Injectable } from "@angular/core";
import { <%= classify(name) %>Store } from "./<%= dasherize(name) %>.store";

@Injectable()
export class <%= classify(name) %>Service {
    constructor(private store: <%= classify(name) %>Store) {}
}
