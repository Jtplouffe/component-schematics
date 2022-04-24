import { strings } from "@angular-devkit/core";
import {
    apply,
    filter,
    mergeWith,
    Rule,
    SchematicContext,
    template,
    Tree,
    url,
} from "@angular-devkit/schematics";
import { Schema } from "./schema";

export function component(options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const sourceTemplates = url("./files");

        const sourceParametrizedTemplates = apply(sourceTemplates, [
            filter((path => {
                if (path.endsWith(".style.scss") && !options.stylesheet) {
                    return false;
                }

                if (stringEndsWithAny(path, [".query.ts", ".service.ts", ".store.ts"]) && !options.store) {
                    return false;
                }

                return true;
            })),
            template({
                ...options,
                ...strings,
                prefix: extractPrefix(tree)
            })
        ]);

        return mergeWith(sourceParametrizedTemplates);
    };
}

function extractPrefix(tree: Tree): string | undefined {
    const workspaceConfig = tree.read("/angular.json");
    if (!workspaceConfig) return;
    
    const workspaceContent = workspaceConfig.toString();
    const workspace = JSON.parse(workspaceContent);

    const projectName = workspace.defaultProject;
    if (!projectName) return;

    const project = workspace.projects[projectName];

    return project?.prefix;
}

function stringEndsWithAny(source: string, searchStrings: string[]): boolean {
    return searchStrings.some((searchString) => source.endsWith(searchString));
}
