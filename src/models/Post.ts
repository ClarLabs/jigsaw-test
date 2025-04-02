import * as mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true }
)

export const Post = mongoose.model('Post', postSchema)
