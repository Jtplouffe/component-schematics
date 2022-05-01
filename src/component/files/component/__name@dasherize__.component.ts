import { Component<% if (modal) { %>, Inject<% } %>, ViewEncapsulation } from "@angular/core";<% if (store) { %>
import { <%= classify(name) %>Service } from "./store/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Query } from "./store/<%= dasherize(name) %>.query";<% } if (modal) { %>
import { <%= classifyWithSuffix(name, "Data") %> } from "./<%= dasherize(name) %>.data";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";<% }  if (form) {%>
import { GeneratedFormGroup, NgxFormGeneratorProvider } from "@recursyve/ngx-form-generator";
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

    <% } if (store || form || modal) { %>constructor(<% if (modal) { %>
        @Inject(MAT_DIALOG_DATA) public data: <%= classifyWithSuffix(name, "Data") %>,
        private matDialogRef: MatDialogRef<<%= classify(name) %>Component>,<% } if (form) { %>
        public formGroup: GeneratedFormGroup<<%= classifyWithSuffix(name, "Form") %>>,<% } if (store) { %>
        private service: <%= classify(name) %>Service,
        private query: <%= classify(name) %>Query,<% } %>
    ) {}<% } %>
}
