"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const Post_1 = require("../../../models/Post");
const utils_1 = require("../../../utils");
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!(0, utils_1.isMongoId)(id)) {
            res.status(400).json({ error: 'Invalid or missing post ID' });
            return;
        }
        const result = await Post_1.Post.findOneAndDelete({ _id: id });
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
exports.deletePost = deletePost;
//# sourceMappingURL=deletePost.js.map