const mongoose = require('mongoose')

const mongoose_url = 'mongodb://smobey:yhelothar@ds229438.mlab.com:29438/puhelinluettelo-db'

mongoose.connect(mongoose_url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
})

module.exports = Person