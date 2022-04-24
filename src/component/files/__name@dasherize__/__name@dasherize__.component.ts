import { Component, ViewEncapsulation } from "@angular/core";<% if (store) { %>
import { <%= classify(name) %>Service } from "./store/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Query } from "./store/<%= dasherize(name) %>.query";
<% } %>

@Component({
    selector: "<%= prefix ? prefix + '-' + dasherize(name) : dasherize(name) %>",
    templateUrl: "./<%= dasherize(name) %>.template.html",<% if (stylesheet) { %>
    styleUrls: ["./<%= dasherize(name) %>.style.scss"],<% } %>
    encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>Component {
    <% if (store) { %>public loading$ = this.query.selectLoading();

    constructor(
        private service: <%= classify(name) %>Service,
        private query: <%= classify(name) %>Query,
    ) {}<% } %>
}
