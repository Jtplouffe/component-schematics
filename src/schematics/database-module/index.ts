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
import { camelizeWithSuffix, classifyWithSuffix } from "../../utils/case.utils";
import { toSingular } from "../../utils/string.utils";

export function databaseModule(schema: Schema): Rule {
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
        camelizeWithSuffix,
        toSingular
    };

    const baseDest = `${config.path}/${strings.dasherize(config.name)}`;

    const sources = [
        apply(url("./files/module"), [
            template(templateOptions),
            move(baseDest)
        ]),
        apply(url("./files/model"), [
            template(templateOptions),
            move(`${baseDest}/models`)
        ])
    ];

    if (config.controller) {
        sources.push(
            apply(url("./files/controller"), [
                template(templateOptions),
                move(`${baseDest}/controllers`)
            ])
        );
    }

    if (config.service) {
        sources.push(
            apply(url("./files/service"), [
                template(templateOptions),
                move(`${baseDest}/services`)
            ])
        );
    }

    if (config.dto) {
        sources.push(
            apply(url("./files/dto"), [
                template(templateOptions),
                move(`${baseDest}/dto`)
            ])
        );
    }

    return sources;
}
