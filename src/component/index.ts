import { strings } from "@angular-devkit/core";
import {
    apply,
    filter,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from "@angular-devkit/schematics";

export interface Schema {
    name: string;
    path: string;
    stylesheet: boolean;
    store: boolean;
    prefix: string;
}

function loadWorkspace(tree: Tree): any {
    const workspaceConfig = tree.read("/angular.json");
    if (!workspaceConfig) return;

    const workspaceContent = workspaceConfig.toString();
    return JSON.parse(workspaceContent);
}

function getProject(workspace: any): any {
    const projectName = workspace.defaultProject;
    if (!projectName) return;

    return workspace.project?.[projectName];
}

function configureOptions(options: Schema, tree: Tree): void {
    const workspace = loadWorkspace(tree);
    if (!workspace) return;

    const project = getProject(workspace);
    if (!project) return;

    options.prefix = project.prefix;

    if (options.path === undefined) {
        // https://github.com/angular/angular-cli/blob/94288c7414b79432c12c21947320a549c1752266/packages/schematics/angular/utility/workspace.ts#L76
        const root = project.sourceRoot
            ? `/${project.sourceRoot}/`
            : `/${project.root}/src/`;
        const projectDirName =
            project.extensions["projectType"] === "application" ? "app" : "lib";
        options.path = `${root}${projectDirName}`;
    }
}

export function component(options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        configureOptions(options, tree);

        const sourceTemplates = url("./files");

        const sourceParametrizedTemplates = apply(sourceTemplates, [
            filter((path) => {
                if (path.endsWith(".style.scss") && !options.stylesheet) {
                    return false;
                }

                if (
                    stringEndsWithAny(path, [
                        ".query.ts",
                        ".service.ts",
                        ".store.ts",
                    ]) &&
                    !options.store
                ) {
                    return false;
                }

                return true;
            }),
            template({
                ...options,
                ...strings,
            }),
            move(options.path),
        ]);

        return mergeWith(sourceParametrizedTemplates);
    };
}

function stringEndsWithAny(source: string, searchStrings: string[]): boolean {
    return searchStrings.some((searchString) => source.endsWith(searchString));
}
