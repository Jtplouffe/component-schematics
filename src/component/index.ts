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
    url,
} from "@angular-devkit/schematics";
import { Config, Schema } from "./config";

export function component(schema: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const config = new Config(schema, tree);

        const sourceTemplates = url("./files");

        const sourceParametrizedTemplates = apply(sourceTemplates, [
            filter((path) => {
                // TODO: make clean

                if (path.endsWith(".style.scss") && !config.stylesheet) {
                    return false;
                }

                if (
                    stringEndsWithAny(path, [
                        ".query.ts",
                        ".service.ts",
                        ".store.ts",
                    ]) &&
                    !config.store
                ) {
                    return false;
                }

                return true;
            }),
            template({
                ...config,
                ...strings,
            }),
            move(config.path),
        ]);

        return mergeWith(sourceParametrizedTemplates);
    };
}

function stringEndsWithAny(source: string, searchStrings: string[]): boolean {
    return searchStrings.some((searchString) => source.endsWith(searchString));
}
