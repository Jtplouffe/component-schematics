import { Table } from "sequelize-typescript";
import { SequelizeEntities } from "../../common/models/sequelize-entities.model";

@Table
export class <%= classify(name) %> extends SequelizeEntities {}
