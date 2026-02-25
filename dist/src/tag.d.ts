export type Tag<TMetadata extends object> = {
    name: symbol;
    metadata: TMetadata;
};
export type TagDefinition<TTarget extends object, TMetadata extends object> = {
    name: symbol;
    make(metadata: TMetadata): Tag<TMetadata>;
    decorator(metadata: TMetadata): (target: new (...args: any[]) => TTarget) => void;
};
export declare function defineTag<TMetadata extends object, TTarget extends object = object>(name: string): TagDefinition<TTarget, TMetadata>;
