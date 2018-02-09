const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const mongoose_url = 'mongodb://smobey:a@ds229438.mlab.com:29438/puhelinluettelo-db'

mongoose.connect(mongoose_url)

var personSchema = new Schema({ name: String, number: String })
personSchema.statics.format = function(person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id
      }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person