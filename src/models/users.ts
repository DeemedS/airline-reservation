import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  middlename: string;
  nationality: string;
  gender: string;
  birthday: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  
  firstname: { type: String, required: [true, "please provide a firstname"] },
  lastname: { type: String, required: [true, "please provide a lastname"] },
  middlename: { type: String },
  nationality: { type: String, required: [true, "please provide a nationality"] },
  gender: { type: String, required: [true, "please provide a lastname"] },
  birthday: { type: String, required: [true, "please provide a lastname"] },
  username: { type: String, required: [true, "please provide a username"] },
  email : { type: String, required: [true, "please provide a email"], unique: true },
  password: { type: String, required: [true, "please provide a password"] },
  role: {type: String, default: "user"},

});

const User = mongoose.models.users ||  mongoose.model<IUser>('users', userSchema);


export default User;