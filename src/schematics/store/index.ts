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
import * as path from "path";
import { InsertChange } from "schematics-utilities";
import * as ts from "typescript";
import { camelizeWithSuffix, classifyWithSuffix } from "../../utils/case.utils";
import { Config, Schema } from "./config";

export function store(schema: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const config = new Config(schema, tree);

        if (config.addToModule) maybeAddToModule(tree, config);

        const templateSource = buildTemplateSource(config);
        return mergeWith(templateSource);
    };
}

function buildTemplateSource(config: Config): Source {
    const templateOptions = {
        ...config.templateOptions(),
        ...strings,
        classifyWithSuffix,
        camelizeWithSuffix,
    };

    return apply(url("./files/store"), [template(templateOptions), move(`${config.path}/store`)]);
}

// We only add to module if we find matching config.name
function maybeAddToModule(tree: Tree, config: Config): void {
    const moduleFilename = `${strings.dasherize(config.name)}.module.ts`;
    const moduleFilePath = path.join(config.path, moduleFilename);
    const moduleFileContent = tree.read(moduleFilePath)?.toString("utf-8");
    if (!moduleFileContent?.length) return;

    const ast = ts.createSourceFile(moduleFilename, moduleFileContent, ts.ScriptTarget.Latest, true);

    const providersChange = getModuleDecoratorProvidersChange(ast, config, moduleFilePath);
    if (!providersChange) return;

    const declarationRecorder = tree.beginUpdate(moduleFilePath);
    declarationRecorder.insertLeft(providersChange.pos, providersChange.toAdd);

    const importsChange = getModuleProviderImportChange(ast, config, moduleFilePath);
    if (!importsChange) return;
    declarationRecorder.insertLeft(importsChange.pos, importsChange.toAdd);

    tree.commitUpdate(declarationRecorder);
}

function getModuleDecoratorProvidersChange(ast: ts.Node, config: Config, moduleFilePath: string): InsertChange | null {
    const decoratorSyntaxList = getNestedChildForTypes(ast, [
        ts.SyntaxKind.SyntaxList,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.SyntaxList,
        ts.SyntaxKind.Decorator,
        ts.SyntaxKind.CallExpression,
        ts.SyntaxKind.SyntaxList,
        ts.SyntaxKind.ObjectLiteralExpression,
        ts.SyntaxKind.SyntaxList,
    ]);
    if (!decoratorSyntaxList) return null;

    const providersPorpertyAssignment = decoratorSyntaxList.getChildren().find((child) => {
        if (child.kind !== ts.SyntaxKind.PropertyAssignment || !child.getChildCount()) return false;

        const firstNestedChild = child.getChildAt(0);
        return firstNestedChild.getText() === "providers";
    });

    // Wether there is already the providers array in the decorator
    if (!providersPorpertyAssignment) {
        const decoratorObject = decoratorSyntaxList.parent;

        let declaration = `\n    providers: [${getBaseProviderDeclaration(config)}]`;
        if (decoratorSyntaxList.getChildCount()) {
            declaration = `,${declaration}`;
        }

        const lastChildPos = decoratorObject.getChildAt(decoratorObject.getChildCount() - 1).pos;
        return new InsertChange(moduleFilePath, lastChildPos, declaration);
    } else {
        const providersArray = getChildOfKind(providersPorpertyAssignment, ts.SyntaxKind.ArrayLiteralExpression);
        if (!providersArray) {
            // Providers is somehow not an array, so return instead of breaking it.
            return null;
        }

        const lastChildPos = providersArray.getChildAt(providersArray.getChildCount() - 1).pos;
        return new InsertChange(moduleFilePath, lastChildPos, getProviderDeclaration(providersArray, config));
    }
}

function getModuleProviderImportChange(ast: ts.Node, config: Config, moduleFilePath: string): InsertChange | null {
    const node = getChildOfKind(ast, ts.SyntaxKind.SyntaxList);
    if (!node?.getChildCount()) return null;

    const insertAtPos = node.getChildAt(0).pos;

    let declaration = "";
    for (const fileType of ["query", "service", "store"]) {
        const className = `${strings.classify(config.name)}${strings.classify(fileType)}`;
        const filename = `${strings.dasherize(config.name)}.${fileType}`;

        declaration += `import { ${className} } from "./store/${filename}";\n`;
    }

    return new InsertChange(moduleFilePath, insertAtPos, declaration);
}

function getBaseProviderDeclaration(config: Config): string {
    const baseClassName = strings.classify(config.name);
    return `${baseClassName}Query, ${baseClassName}Service, ${baseClassName}Store`;
}

function getProviderDeclaration(providersArray: ts.Node, config: Config): string {
    const providerDeclaration = getBaseProviderDeclaration(config);
    const declalationSyntaxList = getChildOfKind(providersArray, ts.SyntaxKind.SyntaxList);

    if (!declalationSyntaxList?.getChildCount()) return providerDeclaration;
    return `, ${providerDeclaration}`;
}

function getChildOfKind(node: ts.Node, kind: ts.SyntaxKind): ts.Node | undefined {
    return node.getChildren().find((child) => child.kind === kind);
}, MyTestComponentQuery, MyTestComponentService, MyTestComponentSt

// Depth-first traversal of the ast, in order the find child in order of kinds
function getNestedChildForTypes(node: ts.Node, kinds: ts.SyntaxKind[]): ts.Node | undefined {
    if (!kinds.length) return node;

    const kind = kinds.shift();
    for (const child of node.getChildren()) {
        if (child.kind === kind) {
            const nestedChild = getNestedChildForTypes(child, kinds);
            if (nestedChild) return nestedChild;
        }
    }
}
