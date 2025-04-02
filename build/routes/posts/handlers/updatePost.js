"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = void 0;
const Post_1 = require("../../../models/Post");
const utils_1 = require("../../../utils");
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!(0, utils_1.isMongoId)(id)) {
            res.status(400).json({ error: 'Invalid or missing post ID' });
            return;
        }
        const post = await Post_1.Post.findById(id);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        Object.assign(post, updates);
        await post.save();
        res.json(post);
    }
    catch (err) {
        next(err);
    }
};
exports.updatePost = updatePost;
//# sourceMappingURL=updatePost.js.map