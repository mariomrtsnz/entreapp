import mongoose, { Schema } from 'mongoose'

const routeSchema = new Schema({
  pois: [{
    type: Schema.Types.ObjectId,
    ref: 'Poi',
    required: true
  }],
  name: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

routeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      pois: this.pois,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Route', routeSchema)

export const schema = model.schema
export default model
