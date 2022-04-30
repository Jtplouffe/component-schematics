import { Tree } from "@angular-devkit/schematics/src/tree/interface";

export interface Schema {
    name: string;
    path: string;
    form: boolean;
    modal: boolean;
    stylesheet: boolean;
    store: boolean;
}

export interface TemplateConfig extends Omit<Schema, "path"> {
    prefix?: string;
}

export class Config implements Schema {
    private workspace: any; // TODO: workspace type
    private project: any; // TODO: project type

    private get projectSourcePath(): string | null {
        if (!this.project) return null;

        const root = this.project.sourceRoot
            ? `/${this.project.sourceRoot}`
            : `/${this.project.root}/src/`;
        const projectDirName =
            this.project.extensions["projectType"] === "application"
                ? "app"
                : "lib";
        return `${root}${projectDirName}`;
    }

    public get name(): string {
        return this.schema.name;
    }

    public get path(): string {
        return this.schema.path ?? this.projectSourcePath;
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

    public templateConfig(): TemplateConfig {
        return {
            name: this.schema.name,
            prefix: this.project?.prefix,
            store: this.schema.store,
            form: this.schema.form,
            modal: this.schema.modal,
            stylesheet: this.schema.stylesheet,
        };
    }

    constructor(private readonly schema: Schema, private readonly tree: Tree) {
        this.load();
    }

    private load(): void {
        this.workspace = this.loadWorkspace();
        this.project = this.loadProject();
    }

    private loadWorkspace(): any | null {
        // TODO: workspace type
        const workspaceConfig = this.tree.read("/angular.json");
        if (!workspaceConfig) return null;

        return JSON.parse(workspaceConfig.toString());
    }

    private loadProject(): any | null {
        // TODO: project type
        const projectName = this.workspace?.defaultProject;
        if (!projectName) return null;

        return this.workspace.projects[projectName];
    }
}
