import mongoose, { Schema } from 'mongoose'

const supercategorySchema = new Schema({
  name: {
    type: String
  },
  categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

supercategorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Supercategory', supercategorySchema)

export const schema = model.schema
export default model
