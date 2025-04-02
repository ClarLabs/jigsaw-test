"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("./posts/posts");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/posts', posts_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map