import { Component<% if (modal) { %>, Inject<% } %>, ViewEncapsulation } from "@angular/core";<% if (store) { %>
import { <%= classify(name) %>Service } from "./store/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Query } from "./store/<%= dasherize(name) %>.query";<% } if (modal) { %>
import { <%= classifyWithSuffix(name, "Data") %> } from "./<%= dasherize(name) %>.data";
import { GeneratedFormGroup, NgxFormGeneratorProvider } from "@recursyve/ngx-form-generator";<% }  if (form) {%>
import { <%= classifyWithSuffix(name, "Form") %> } from "./<%= dasherize(name) %>.form";<% } %>

@Component({
    selector: "<%= prefix ? prefix + '-' + dasherize(name) : dasherize(name) %>",
    templateUrl: "./<%= dasherize(name) %>.template.html",<% if (stylesheet) { %>
    styleUrls: ["./<%= dasherize(name) %>.style.scss"],<% } %>
    encapsulation: ViewEncapsulation.None<% if (form) { %>,
    providers: NgxFormGeneratorProvider.forFeature([<%= classifyWithSuffix(name, "Form") %>])<% } %>
})
export class <%= classify(name) %>Component {
    <% if (store) { %>public loading$ = this.query.selectLoading();

    constructor(<% if (modal) { %>
        @Inject(MAT_DIALOG_DATA) public data: <%= classifyWithSuffix(name, "Data") %>,<% } if (form) { %>
        private formGroup: GeneratedFormGroup<<%= classifyWithSuffix(name, "Form") %>>,<% } %>
        private service: <%= classify(name) %>Service,
        private query: <%= classify(name) %>Query,
    ) {}<% } %>
}
