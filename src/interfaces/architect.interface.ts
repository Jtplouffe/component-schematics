export interface Architect {
    [name: string]: ArchitectOptions;
}

export interface ArchitectOptions {
    builder: string;
    options: object;
    configuration: object;
    defaultConfiguration: string;
}
