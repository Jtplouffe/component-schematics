import { Module } from "@nestjs/common";<% if (service) { %>
import { <%= classify(name) %>Service } from "./services/<%= dasherize(name) %>.service";<% } %>
import { <%= classify(name) %> } from "./models/<%= dasherize(name) %>.model";
import { SequelizeModule } from "@nestjs/sequelize";<% if (controller) { %>
import { <%= classify(name) %>Controller } from "./controllers/<%= dasherize(name) %>.controller";<% } %>

@Module({
    imports: [SequelizeModule.forFeature([<%= classify(name) %>])]<% if (controller || service) { %>,<% } %><% if (controller) { %>
    controllers: [<%= classify(name) %>Controller]<% if (service) { %>,<% } %><% } %><% if (service) { %>
    providers: [<%= classify(name) %>Service],
    exports: [<%= classify(name) %>Service]<% } %>
})
export class <%= classify(name) %>Module {}
