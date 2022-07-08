const { Schema, Types, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Provide the username",
        trim: true

    },
    email: {
        type: String,
        required: "Provide the email",
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address']
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
    friends: this

},
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

model.exports = User;