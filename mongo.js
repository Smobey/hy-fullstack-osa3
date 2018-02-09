const mongoose = require('mongoose')

const url = 'mongodb://smobey:(pass)@ds229438.mlab.com:29438/puhelinluettelo-db'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

if (process.argv.length < 3) {
    Person
    .find({})
    .then(result => {
        console.log("puhelinluettelo:")
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

else {
    const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
    })
    
    person
    .save()
    .then(response => {
        console.log("lisätään henkilö " + process.argv[2] + " numero " + process.argv[3] + " luetteloon")
        mongoose.connection.close()
    })
}

