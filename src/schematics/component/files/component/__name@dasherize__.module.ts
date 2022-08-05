import { NgModule } from "@angular/core";
import { <%= classify(name) %>Component } from "./<%= dasherize(name) %>.component";<% if (store) { %>
import { <%= classify(name) %>Query } from "./store/<%= dasherize(name) %>.query";
import { <%= classify(name) %>Service } from "./store/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Store } from "./store/<%= dasherize(name) %>.store";<% } if (modal) { %>
import { <%= classify(name) %>Directive } from "./<%= dasherize(name) %>.directive";
import { MatDialogModule } from "@angular/material/dialog";<% } %>

@NgModule({
    declarations: [<%= classify(name) %>Component<% if (modal) { %>, <%= classify(name) %>Directive<% } %>],
    imports: [<% if (modal) { %>MatDialogModule<% } %>],<% if (store) { %>
    providers: [<%= classify(name) %>Query, <%= classify(name) %>Service, <%= classify(name) %>Store],<% } %>
    exports: [<%= classify(name) %>Component<% if (modal) { %>, <%= classify(name) %>Directive<% } %>]
})
export class <%= classify(name) %>Module {}
