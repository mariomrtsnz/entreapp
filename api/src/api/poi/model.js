import mongoose, { Schema } from 'mongoose'

const poiSchema = new Schema({
  name: {
    type: String
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  qrCode: {
    type: String
  },
  audioguides: [{
    type: String
  }],
  description: {
    type: String
  },
  coverImage: {
    type: String
  },
  images: [{
    type: String
  }],
  year: {
    type: Number
  },
  creator: {
    type: String
  },
  status: {
    type: String
  },
  schedule: {
    type: String
  },
  price: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

poiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      coordinates: this.coordinates,
      comments: this.comments,
      badges: this.badges,
      qrCode: this.qrCode,
      audioguides: this.audioguides,
      description: this.description,
      coverImage: this.coverImage,
      images: this.images,
      year: this.year,
      creator: this.creator,
      likes: this.likes,
      status: this.status,
      schedule: this.schedule,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Poi', poiSchema)

export const schema = model.schema
export default model
