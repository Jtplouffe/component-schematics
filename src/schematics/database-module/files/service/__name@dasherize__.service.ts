import { SequelizeRepository } from "../../common/repositories/sequelize/sequelize.repository";
import { <%= classify(name) %> } from "../models/<%= dasherize(name) %>.model";
import { InjectModel } from "@nestjs/sequelize";

export class <%= classify(name) %>Service extends SequelizeRepository<<%= classify(name) %>> {
    constructor(@InjectModel(<%= classify(name) %>) repository: typeof <%= classify(name) %>) {
        super(repository);
    }
}
