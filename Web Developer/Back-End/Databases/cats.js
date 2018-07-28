var mongoose = require ("mongoose").set('debug', true);

mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema(
{
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create (
    {name: "new new new Snow White",
    age: 10,
    temperament: "Bland"
    }, function (err, cat) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(cat);
        }
        
    }
);

// add new cat to databse
// var george = new Cat(
// {
//     name: "George",
//     age: 11,
//     temperament: "Cute"
// });

// george.save(function (err, catSaved)
// {
//     if (err){
//         console.log("Something went wrong" +  err);
//     }
//     else {
//         console.log("We have a cat");
//         console.log(catSaved);
//     }
// });

Cat.find({}, function (err, cats) {
    if (err){
        console.log("Something went wrong" +  err);
    }
    else {
        console.log("All the cats...");
        console.log(cats);
    }
});



