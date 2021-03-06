// this is the subdocument schema for the Thought model
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: "Provide the reaction text",
        maxLength: 280
    },
    username: {
        type: String,
        required: "Provide the username"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;