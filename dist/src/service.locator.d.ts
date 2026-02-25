import { DiscoveryService, Reflector } from '@nestjs/core';
import type { TagDefinition } from './tag';
export type TaggedService<TTarget extends object, TMetadata extends object> = {
    service: TTarget;
    metadata: TMetadata;
};
export declare class ServiceLocator {
    private readonly discovery;
    private readonly reflector;
    constructor(discovery: DiscoveryService, reflector: Reflector);
    tagged<TTarget extends object, TMetadata extends object>(tag: TagDefinition<TTarget, TMetadata>): TaggedService<TTarget, TMetadata>[];
    private getTaggedService;
}
