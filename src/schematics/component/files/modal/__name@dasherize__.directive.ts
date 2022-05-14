import { Directive } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { <%= classify(name) %>Component } from "./<%= dasherize(name) %>.component";
import { <%= classify(name) %>Data } from "./<%= dasherize(name) %>.data";
import { NiceModalOnClickDirective } from "@recursyve/nice-ui-kit.v2";

@Directive({ selector: "[<%= camelizeWithSuffix((prefix ?? '') + name, 'Modal') %>]" })
export class <%= classify(name) %>Directive extends NiceModalOnClickDirective<
    <%= classify(name) %>Component,
    any,
    <%= classify(name) %>Data
> {
    constructor(matDialog: MatDialog) {
        super(matDialog, <%= classify(name) %>Component, {
            autoFocus: false
        });
    }
}
