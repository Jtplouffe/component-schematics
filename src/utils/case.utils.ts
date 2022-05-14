import { strings } from "@angular-devkit/core";

export function classifyWithSuffix(name: string, suffix: string): string {
    if (name.toLowerCase().endsWith(suffix.toLowerCase())) return strings.classify(name);
    return `${strings.classify(name)}${suffix}`;
}

export function camelizeWithSuffix(name: string, suffix: string): string {
    if (name.toLowerCase().endsWith(suffix.toLowerCase())) return strings.camelize(name);
    return strings.camelize(`${name}${suffix}`);
}
