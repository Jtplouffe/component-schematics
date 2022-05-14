import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { Workspace } from "../interfaces/workspace.interface";
import { Project } from "../interfaces/project.interface";

export class BaseConfig {
    protected workspace: Workspace | null;
    protected project: Project | null;

    protected get projectSourcePath(): string | null {
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

    constructor(public tree: Tree) {
        this.load();
    }

    private load(): void {
        this.workspace = this.loadWorkspace();
        this.project = this.loadProject();
    }

    private loadWorkspace(): Workspace | null {
        const workspaceConfig = this.tree.read("/angular.json");
        if (!workspaceConfig) return null;

        return JSON.parse(workspaceConfig.toString());
    }

    private loadProject(): Project | null {
        const projectName = this.workspace?.defaultProject;
        if (!projectName) return null;

        return this.workspace?.projects[projectName] ?? null;
    }
}
