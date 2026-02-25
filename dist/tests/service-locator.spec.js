"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const src_1 = require("../src");
const GreeterTag = (0, src_1.defineTag)('test.greeter');
let EnglishGreeter = class EnglishGreeter {
    greet() {
        return 'hello';
    }
};
EnglishGreeter = __decorate([
    GreeterTag.decorator({ language: 'en' })
], EnglishGreeter);
let DutchGreeter = class DutchGreeter {
    greet() {
        return 'hallo';
    }
};
DutchGreeter = __decorate([
    GreeterTag.decorator({ language: 'nl' })
], DutchGreeter);
const UnrelatedTag = (0, src_1.defineTag)('test.unrelated');
let UnrelatedService = class UnrelatedService {
};
UnrelatedService = __decorate([
    UnrelatedTag.decorator({})
], UnrelatedService);
let UntaggedService = class UntaggedService {
};
UntaggedService = __decorate([
    (0, common_1.Injectable)()
], UntaggedService);
describe('ServiceLocator', () => {
    let locator;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [src_1.ServiceLocatorModule],
            providers: [
                EnglishGreeter,
                DutchGreeter,
                UnrelatedService,
                UntaggedService,
            ],
        }).compile();
        await moduleRef.init();
        locator = moduleRef.get(src_1.ServiceLocator);
    });
    it('should find all providers tagged with a given tag', () => {
        const greeters = locator.tagged(GreeterTag);
        expect(greeters).toHaveLength(2);
    });
    it('should return the correct service instances', () => {
        const greeters = locator.tagged(GreeterTag);
        const greetings = greeters.map((g) => g.service.greet()).sort();
        expect(greetings).toEqual(['hallo', 'hello']);
    });
    it('should return the correct metadata for each tagged service', () => {
        const greeters = locator.tagged(GreeterTag);
        const languages = greeters.map((g) => g.metadata.language).sort();
        expect(languages).toEqual(['en', 'nl']);
    });
    it('should not include providers tagged with a different tag', () => {
        const greeters = locator.tagged(GreeterTag);
        expect(greeters.every((g) => 'greet' in g.service)).toBe(true);
    });
    it('should not include untagged providers', () => {
        const greeters = locator.tagged(GreeterTag);
        expect(greeters).toHaveLength(2);
    });
    it('should return an empty array when no providers match the tag', () => {
        const emptyTag = (0, src_1.defineTag)('test.nonexistent');
        const result = locator.tagged(emptyTag);
        expect(result).toEqual([]);
    });
});
//# sourceMappingURL=service-locator.spec.js.map