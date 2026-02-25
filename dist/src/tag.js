"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTag = defineTag;
const common_1 = require("@nestjs/common");
const metadata_1 = require("./metadata");
function defineTag(name) {
    const nameSymbol = Symbol(name);
    const make = (metadata) => ({
        name: nameSymbol,
        metadata,
    });
    const decorator = (metadata) => (0, common_1.applyDecorators)((0, common_1.Injectable)(), (0, common_1.SetMetadata)(metadata_1.TAG_METADATA_KEY, [make(metadata)]));
    return { name: nameSymbol, make, decorator };
}
//# sourceMappingURL=tag.js.map