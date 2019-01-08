import mongoose, { Schema } from 'mongoose'

const badgeSchema = new Schema({
  name: {
    type: String
  },
  points: {
    type: Number
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  pois: {
    type: [Schema.Types.ObjectId],
    ref: 'Poi',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

badgeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      points: this.points,
      description: this.description,
      icon: this.icon,
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

const model = mongoose.model('Badge', badgeSchema)

export const schema = model.schema
export default model
