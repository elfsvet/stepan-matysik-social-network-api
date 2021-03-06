const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Provide the text",
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TODO use a getter method to format the timestamp on query
        get: (createAtVal) => dateFormat(createAtVal)
    },
    username: {
        type: String,
        required: "Provide the username of the author"
    },
    reactions: [reactionSchema]
},
{
        toJSON: {
            virtuals: true,
            getters: true

        }
    }
)

ThoughtSchema.virtual('reactionCount', function () {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

//  thoughts does not work to create with wrong username will created anyway. check it later.