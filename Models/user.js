import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (V) {
                return /^[a-zA-Z]{3,8}[0-9]{0,5}(@)(gmail)(.com)$/.test(V)
            },
            message: ({ value }) => `${value} Email Not Valid`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

})


userSchema.pre('save', async function (doc, next) {
    // * console.log(this);
    // * console.log(this.password);
    const hashedPassword = await bcrypt.hash(this.password, 8)
    this.password = hashedPassword
})




export const userModel = model('user', userSchema)