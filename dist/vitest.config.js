"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        globals: true,
        include: ['tests/**/*.spec.ts'],
    },
    plugins: [unplugin_swc_1.default.vite()],
});
//# sourceMappingURL=vitest.config.js.map