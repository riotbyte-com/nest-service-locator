"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLocator = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const metadata_1 = require("./metadata");
let ServiceLocator = class ServiceLocator {
    constructor(discovery, reflector) {
        this.discovery = discovery;
        this.reflector = reflector;
    }
    tagged(tag) {
        return this.discovery
            .getProviders()
            .flatMap((wrapper) => {
            return this.getTaggedService(tag, wrapper);
        });
    }
    getTaggedService(tag, wrapper) {
        const tags = wrapper.metatype
            ? this.reflector.get(metadata_1.TAG_METADATA_KEY, wrapper.metatype)
            : undefined;
        return (tags?.reduce((taggedServices, found) => {
            if (tag.name === found.name) {
                taggedServices.push({
                    service: wrapper.instance,
                    metadata: found.metadata,
                });
            }
            return taggedServices;
        }, []) ?? []);
    }
};
exports.ServiceLocator = ServiceLocator;
exports.ServiceLocator = ServiceLocator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.Reflector])
], ServiceLocator);
//# sourceMappingURL=service.locator.js.map