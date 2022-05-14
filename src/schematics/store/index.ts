import { strings } from "@angular-devkit/core";
import {
    apply,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    Source,
    template,
    Tree,
    url
} from "@angular-devkit/schematics";
import { Config, Schema } from "./config";
import { camelizeWithSuffix, classifyWithSuffix } from "../../utils/case.utils";

export function store(schema: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const config = new Config(schema, tree);

        const templateSource = buildTemplateSource(config);
        return mergeWith(templateSource);
    };
}

function buildTemplateSource(config: Config): Source {
    const templateOptions = {
        ...config.templateOptions(),
        ...strings,
        classifyWithSuffix,
        camelizeWithSuffix
    };

    return apply(url("./files/store"), [
        template(templateOptions),
        move(`${config.path}/store`)
    ]);
}
