import { Controller } from "@nestjs/common";
import { <%= classify(name) %>Service } from "../services/<%= dasherize(name) %>.service";

@Controller("<%= toSingular(dasherize(name), true) %>")
export class <%= classify(name) %>Controller {
    constructor(private service: <%= classify(name) %>Service) {}
}
