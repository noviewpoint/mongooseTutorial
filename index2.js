// ustvarjena kolekcija 'restaurants' z importanimi podatki iz testData.json

const mongoose    = require('mongoose');

var dbConnectionString = process.env.MONGO;

mongoose.connect(dbConnectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We\'re connected and ready to manipulate \'restaurants\' collection!');
});

var Schema = mongoose.Schema;
var Restaurant = mongoose.model("Restaurant", new Schema({}), 'restaurants');
// podatki v bazi ze obstajajo, ne vem kaksne oblike so zato zgolj pripenjam prazno shemo na mongoose

function splosenCallback(err, result) {
    if (err) {
        next(err);
    } else {
        console.log(result);
        console.log('\n\n\n');
    }
}

// https://www.youtube.com/watch?v=RPv2r4Fms2g
// simple aggregation and groups

// prestej tip kuhinje

// Restaurant.aggregate([
//     {
//         $group : {
//             _id: "$cuisine",
//             mojSum: {
//                 $sum: 1
//             },
//             mojMax: {
//                 $max: "$restaurant_id"
//             }
//         }
//     }
// ], splosenCallback);

// https://www.youtube.com/watch?v=xyoK3Y-gjXE
// advanced features

// Restaurant.aggregate([
//     {
//         $group : {
//             _id: "$cuisine",
//             mojSum: {
//                 $sum: 1
//             }
//         }
//     }, {
//         $sort: {
//             mojSum: -1,
//             _id: 1
//         }
//     }
// ], splosenCallback);

// uporaba $unwind na arrayu
// glej kaj query vrne, rezultati se ponovijo za vsak element arraya 

// Restaurant.aggregate([
//     {
//         $unwind: "$grades"
//     }, {
//         $project: { // to reshape the document
//             _id: 0, // deselect (dont return)
//             cuisine: 1,
//             grades: 1
//         }
//     }, {
//         $limit: 10
//     }
// ], splosenCallback);

Restaurant.aggregate([
    {
        $unwind: "$grades"
    }, {
        $group: {
            _id: "$cuisine",
            mojAvgPerRestaurant: { $avg: "$grades.score" },
            mojTotalScore: { $sum: "$grades.score" },
            mojMaxScore: { $max: "$grades.score" },
            mojMinScore: { $min: "$grades.score" }
        }
    }, {
        $sort: {
            mojTotalScore: 1
        }
    }
], splosenCallback);

Restaurant.aggregate([
    {
        $unwind: "$grades"
    }, {
        $match: {
            "grades.score": -1
        }
    }
], splosenCallback);