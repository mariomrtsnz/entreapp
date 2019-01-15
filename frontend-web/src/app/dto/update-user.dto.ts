export class UserUpdateDto {
    email: String;
    name: String;
    role: String;
    picture: String;
    city: String;
    language: String;

    constructor(e: string, n: string, role: string, pic: string, ci: string, langua: string) {
        this.email = e;
        this.name = n;
        this.role = role;
        this.picture = pic;
        this.city = ci;
        this.language = langua;
    }
}


/*  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  services: {
    facebook: String,
    google: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  visited: [{
    type: Schema.Types.ObjectId,
    ref: 'Poi'
  }],
  favs: [{
    type: Schema.Types.ObjectId,
    ref: 'Poi'
  }],
  badges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  city: {
    type: String
  },
  language: {
    type: String
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]*/