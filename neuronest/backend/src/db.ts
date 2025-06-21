
import mongoose, {model, Schema} from "mongoose";

mongoose.connect("mongodb+srv://sohard16begraj:Sohard160404@cluster0.t839f.mongodb.net/neuronest")

const UserSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [String],
    type: String,
    description:String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);