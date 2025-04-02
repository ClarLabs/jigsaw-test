"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const Post_1 = require("../../../models/Post");
const getAllPosts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, tag } = req.query;
        const filter = tag ? { tags: tag } : {};
        const posts = await Post_1.Post.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(`${limit}`))
            .skip((parseInt(`${page}`) - 1) * parseInt(`${limit}`));
        res.json({ posts, totalCount: posts.length, pages: Math.ceil(posts.length / parseInt(`${limit}`)) });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllPosts = getAllPosts;
//# sourceMappingURL=getAllPosts.js.map