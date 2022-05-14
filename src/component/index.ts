import { strings } from "@angular-devkit/core";
import {
    apply,
    chain, mergeWith,
    move,
    Rule,
    SchematicContext,
    Source,
    template,
    Tree,
    url
} from "@angular-devkit/schematics";
import { Config, Schema } from "./config";
import { camelizeWithSuffix, classifyWithSuffix } from "../utils/case.utils";

export function component(schema: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const config = new Config(schema, tree);

        const templateSources = buildTemplateSources(config);

        return chain(templateSources.map(mergeWith));
    };
}

function buildTemplateSources(config: Config): Source[] {
    const templateOptions = {
        ...config.templateOptions(),
        ...strings,
        classifyWithSuffix,
        camelizeWithSuffix
    };

    const baseDest = `${config.path}/${strings.dasherize(config.name)}`;

    const sources = [
        apply(url("./files/component"), [
            template(templateOptions),
            move(baseDest),
        ]),
    ];

    if (config.stylesheet) {
        sources.push(
            apply(url("./files/stylesheet"), [
                template(templateOptions),
                move(baseDest),
            ])
        );
    }

    if (config.store) {
        sources.push(
            apply(url("./files/store"), [
                template(templateOptions),
                move(`${baseDest}/store`)
            ])
        );
    }

    if (config.form) {
        sources.push(
            apply(url("./files/form"), [
                template(templateOptions),
                move(baseDest)
            ])
        );
    }

    if (config.modal) {
        sources.push(
            apply(url("./files/modal"), [
                template(templateOptions),
                move(baseDest)
            ])
        );
    }

    return sources;
}
