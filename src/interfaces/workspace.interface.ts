import { Projects } from "./project.interface";

export interface Workspace {
    version: number;
    newProjectRoot: string;
    projects: Projects;
    defaultProject: string;
    cli: object;
}
