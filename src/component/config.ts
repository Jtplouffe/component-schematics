import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { BaseConfig } from "../common/base-config";

export interface Schema {
    name: string;
    path: string;
    stylesheet: boolean;
    store: boolean;
    form: boolean;
    modal: boolean;
}

export interface TemplateConfig extends Omit<Schema, "path"> {
    prefix?: string;
}

export class Config extends BaseConfig implements Schema {
    public get name(): string {
        return this.schema.name;
    }

    public get path(): string {
        return this.schema.path ?? this.projectSourcePath ?? "";
    }

    public get form(): boolean {
        return this.schema.form;
    }

    public get modal(): boolean {
        return this.schema.modal;
    }

    public get stylesheet(): boolean {
        return this.schema.stylesheet;
    }

    public get store(): boolean {
        return this.schema.store;
    }

    public templateOptions(): TemplateConfig {
        return {
            name: this.schema.name,
            prefix: this.project?.prefix,
            store: this.schema.store,
            form: this.schema.form,
            modal: this.schema.modal,
            stylesheet: this.schema.stylesheet,
        };
    }

    constructor(private readonly schema: Schema, public tree: Tree) {
        super(tree)
    }
}
