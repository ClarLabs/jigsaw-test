import mongoose from 'mongoose'

export const isMongoId = (id: string): boolean => {
	return !!id && mongoose.Types.ObjectId.isValid(String(id))
}
