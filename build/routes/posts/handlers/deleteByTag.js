"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByTag = void 0;
const Post_1 = require("../../../models/Post");
const deleteByTag = async (req, res, next) => {
    try {
        const { tag } = req.query;
        if (!tag) {
            res.status(400).json({ error: 'Tag is required' });
            return;
        }
        const result = await Post_1.Post.deleteMany({ tags: tag });
        if (!result) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteByTag = deleteByTag;
//# sourceMappingURL=deleteByTag.js.map