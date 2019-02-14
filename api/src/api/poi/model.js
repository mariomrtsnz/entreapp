import mongoose, { Schema } from 'mongoose'

const poiSchema = new Schema({
  name: {
    type: String
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  // coordinates: {
  //   lat: {
  //     type: Number,
  //     required: true
  //   },
  //   lng: {
  //     type: Number,
  //     required: true
  //   }
  // },
  loc: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  qrCode: {
    type: String
  },
  audioguides: {
    // Lenguaje por defecto, en nuestro caso siempre ingles. Escribimos el codigo del lenguaje solo.
    language: {
      // ejemplo: "en"
      language: {
        type: Schema.Types.ObjectId,
        ref: 'Language'
      }
    },
    // Fichero por defecto, en nuestro caso en ingles.
    originalFile: {
      // ejemplo: "en-giralda.mp3"
      type: String
    },
    // Array de traducciones con la misma estructura que la de arriba.
    translations: [
      {
        language: {
          // ejemplo: "es"
          language: {
            type: Schema.Types.ObjectId,
            ref: 'Language'
          }
        },
        translatedFile: {
          // ejemplo: "es-giralda.mp3"
          type: String
        }
      }
    ]
  },
  description: {
    language: {
      language: {
        type: Schema.Types.ObjectId,
        ref: 'Language'
      }
    },
    originalDescription: {
      type: String
    },
    translations: [
      {
        language: {
          language: {
            type: Schema.Types.ObjectId,
            ref: 'Language'
          }
        },
        translatedDescription: {
          type: String
        }
      }
    ]
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
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      qrCode: this.qrCode,
      description: this.description,
      coverImage: this.coverImage,
      year: this.year,
      creator: this.creator,
      coordinates: this.loc.coordinates
    }
    const translationView = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      audioguides: this.audioguides,
    }
    const fullView = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      qrCode: this.qrCode,
      description: this.description,
      coverImage: this.coverImage,
      year: this.year,
      creator: this.creator,
      coordinates: this.loc.coordinates,
      audioguides: this.audioguides,
      images: this.images,
      status: this.status,
      schedule: this.schedule,
      price: this.price,
    }
    switch (full) {
      case 0:
        return view;
      case 1:
        return fullView;
      case 2:
        return translationView;
      default:
        return view;
    }

  }
}

const model = mongoose.model('Poi', poiSchema)

export const schema = model.schema
export default model
