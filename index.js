// MONGOOSE TUTORIAL

var mongoose = require('mongoose');

var dbConnectionString = process.env.MONGO;

mongoose.connect(dbConnectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We\'re connected!');
});

// 1. https://www.youtube.com/watch?v=P1qaEuJrcGA

var mojaSchema = mongoose.Schema({
    myname: {
        type: String,
        required: true
    },
    mynumber: Number
})

var mojModel = mongoose.model('nekiMojga', mojaSchema, 'imeKolekcije');
// ce ne das tretjega argumenta, mongoose sam izdela ime kolekcije kot [all lowercase prvi argument] + 's', torej v tem primeru 'nekimojgas'

var instanca = new mojModel({myname: 'David', mynumber: 23});
console.log(instanca);
instanca.save(function(error, savedObject) {
    if (error) {
        return error;
    }
    console.log(savedObject);
});

// 2. https://www.youtube.com/watch?v=oq-2Gyuegh0
// 3. https://www.youtube.com/watch?v=LT5VRcHg5sk

// reading stuff from database with mongoose models

var database = [];
mojModel.find({}, function(error, foundData) {
    if (error) {
        return error;
    }
    if (foundData && foundData.length) {
        foundData.forEach((x) => {
            database.push(x);
        });
        console.log('Returned results:', database);
    }
});

// 4. https://www.youtube.com/watch?v=coVyhAc2ZJc

