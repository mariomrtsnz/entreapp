import mongoose, { Schema } from 'mongoose'

const languageSchema = new Schema({
  name: {
    type: String
  },
  isoCode: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

languageSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      isoCode: this.isoCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Language', languageSchema)

export const schema = model.schema
export default model
