import { NgModule } from "@angular/core";
import { <%= classify(name) %>Component } from "./<%= dasherize(name) %>.component";<% if (store) { %>
import { <%= classify(name) %>Query } from "./store/<%= dasherize(name) %>.query";
import { <%= classify(name) %>Service } from "./store/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Store } from "./store/<%= dasherize(name) %>.store";<% } %>

@NgModule({
    declarations: [<%= classify(name) %>Component],<% if (store) { %>
    providers: [<%= classify(name) %>Query, <%= classify(name) %>Service, <%= classify(name) %>Store],<% } %>
    exports: [<%= classify(name) %>Component]
})
export class <%= classify(name) %>Module {}
