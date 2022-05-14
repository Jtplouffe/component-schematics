import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { BaseConfig } from "../../common/base-config";

export interface Schema {
    name: string;
    path: string;
    controller: boolean;
    service: boolean;
    dto: boolean;
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

    public get controller(): boolean {
        return this.schema.controller;
    }

    public get service(): boolean {
        return this.schema.service;
    }

    public get dto(): boolean {
        return this.schema.dto;
    }

    public templateOptions(): TemplateConfig {
        return {
            name: this.schema.name,
            prefix: this.project?.prefix,
            controller: this.schema.controller,
            service: this.schema.service,
            dto: this.schema.dto,
        };
    }

    constructor(private readonly schema: Schema, public tree: Tree) {
        super(tree)
    }
}
