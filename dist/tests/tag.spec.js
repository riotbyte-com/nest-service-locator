"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('defineTag', () => {
    it('should create a tag definition with a unique symbol name', () => {
        const tag = (0, src_1.defineTag)('my-tag');
        expect(typeof tag.name).toBe('symbol');
        expect(tag.name.toString()).toBe('Symbol(my-tag)');
    });
    it('should produce unique symbols for the same string name', () => {
        const tag1 = (0, src_1.defineTag)('duplicate');
        const tag2 = (0, src_1.defineTag)('duplicate');
        expect(tag1.name).not.toBe(tag2.name);
    });
    it('should create tags with the correct metadata via make()', () => {
        const tag = (0, src_1.defineTag)('handler');
        const result = tag.make({ handles: 'my-message' });
        expect(result.name).toBe(tag.name);
        expect(result.metadata).toEqual({ handles: 'my-message' });
    });
    it('should return a decorator function from decorator()', () => {
        const tag = (0, src_1.defineTag)('middleware');
        const decorator = tag.decorator({ name: 'my-middleware' });
        expect(typeof decorator).toBe('function');
    });
});
//# sourceMappingURL=tag.spec.js.map