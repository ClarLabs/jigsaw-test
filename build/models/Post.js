"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });
exports.Post = mongoose.model('Post', postSchema);
//# sourceMappingURL=Post.js.map