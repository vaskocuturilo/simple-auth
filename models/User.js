const {Schema, model} = require('mongoose')

const User = Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)

