"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const Post_1 = require("../../../models/Post");
const createPost = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            throw { status: 400, message: 'Title and content are required' };
        }
        const newPost = new Post_1.Post({
            title,
            content,
            tags
        });
        await newPost.save();
        res.json(newPost);
    }
    catch (err) {
        next(err);
    }
};
exports.createPost = createPost;
//# sourceMappingURL=createPost.js.map