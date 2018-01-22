// MONGOOSE TUTORIAL
// OBJECT MODELING FRAMEWORK FOR MONGODB

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

var instanca = new mojModel({myname: 'David', mynumber: 233});
console.log(instanca);
instanca.save(function(error, savedObject) {
    if (error) {
        return error;
    }
    console.log('new saved object was:', savedObject);
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
        // console.log('Returned results:', database);
    }
});

// 4. https://www.youtube.com/watch?v=coVyhAc2ZJc


// najdi specificen id
var id = "5a661b90415c05867094494b"; // navaden string
mojModel.findOne({_id: id}, function(error, foundObject) {
    if (error) {
        return error;
    }
    console.log('element with specific id was:', foundObject);

    if (!foundObject) {
        return;
    }

    foundObject.myname = 'not david';
    foundObject.save(function(error, updatedObject) {
        if (error) {
            return error;
        }
        console.log('element with specific id was updated:', updatedObject);
    })
});

// The versionKey is a property set on each document when first created by Mongoose. This keys value contains the internal revision of the document. The name of this document property is configurable. The default is __v.
// https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongodb

// 5. https://www.youtube.com/watch?v=5_pvYIbyZlU

// deleting data using mongoose

var id = "5a661bbe92b65b7fd85b5594";
mojModel.findOneAndRemove({_id: id}, function(error) {
    if (error) {
        return error;
    }
    console.log('deleted succesfully!');
})

// 6. https://www.youtube.com/watch?v=5_pvYIbyZlU

// advanced schemas

var novaSchema = {
    name: {
        type: String,
        default: 'vanilla',
        index: true // to je to
    },
    otherChoices: {
        choices: [{
            choice: String,
            reason: {
                type: String,
                unique: true
            }
        }]
    }
};

// indexes to make SEARCH faster (binary tree map)
// specific fields can be indexed
// don't put indexes on all fields -> slow inserts!

// 7.https://www.youtube.com/watch?v=OpsnUvOW8Vk

// authentication through mongoose