import mongoose, { Schema } from 'mongoose'

const routeSchema = new Schema({
  name: {
    type: String
  },
  pois: [{
    type: Schema.Types.ObjectId,
    ref: 'Poi',
    required: true
  }]
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
      name: this.name,
      pois: this.pois,
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
