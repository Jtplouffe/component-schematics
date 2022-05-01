import { Directive } from '@angular/core';

@Directive({ selector: '[<%= camelizeWithSuffix((prefix ?? "") + name, suffix) %>]' })
export class <%= classify() %>Directive extends NiceModalOnClickDirective<any> {
    constructor() { }
}
