"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("./handlers");
const router = (0, express_1.Router)();
// GET all posts with pagination and optional tag filter
router.get('/', handlers_1.getAllPosts);
router.delete('/', handlers_1.deleteByTag);
// GET search posts by title or content
router.get('/search', handlers_1.searchPosts);
// GET single post by ID
router.get('/:id', handlers_1.getPostById);
// POST create a new post (contains tricky bugs)
router.post('/', handlers_1.createPost);
// PUT update post (contains tricky bug)
router.put('/:id', handlers_1.updatePost);
// DELETE post (unexpected behavior if ID is malformed)
router.delete('/:id', handlers_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.js.map