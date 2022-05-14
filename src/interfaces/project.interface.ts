import { Architect } from "./architect.interface";
import { Schematics } from "./schematics.interface";
import { Extensions } from "./extensions.interface";

export interface Projects {
    [name: string]: Project;
}

export interface Project {
    projectType: string;
    schematics: Schematics;
    root: string;
    sourceRoot: string;
    prefix: string;
    architect: Architect;
    extensions: Extensions;
}
