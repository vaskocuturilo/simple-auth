const {Schema, model} = require('mongoose')

const Role = Schema({
    value: {type: String, require: true, default: 'USER'}
})

module.exports = model('Role', Role)