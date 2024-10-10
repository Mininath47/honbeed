var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

require('dotenv').config();
var conString = process.env.DB_URL;
const PORT = process.env.PORT || 7000;

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/foods", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("foods").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});


app.delete("/foods/:title", (req, res) => {

    var id = parseInt(req.params.title);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("foods").deleteOne({ UserId: title }).then(() => {
            console.log("Task-Deleted");
            res.end();
        });
    });
});

app.get("/dairy", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("dairy").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/veg", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("vegetarian").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/drinks", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("drinks").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/foods/:categories", (req, res) => {

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("foods").find({ category: req.params.categories }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get('/storeProduct', (req, res) => {
    mongoClient.connect(conString).then(object => {
        const database = object.db('e-com');
        database.collection('storeproduct').find({}).toArray().then((document) => {
            res.send(document);
            res.end();
        })
    })
});

app.post('/storeProduct', (req, res) => {
    const storeData = {
        id          : req.body.id,
        title       : req.body.title,
        price       : req.body.price,
        description : req.body.description,
        category    : req.body.category,
        image       : req.body.image,
        UserId      : req.body.UserId


    }

    mongoClient.connect(conString).then(object => {
        const database = object.db('e-com');
        database.collection('storeproduct').insertOne(storeData).then(() => {
            console.log('data is add...');
            res.end();
        })
    })
})

app.delete("/storeProduct/:id", (req, res)=>{

    var Id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("e-com");
        database.collection("storeproduct").deleteOne({id:Id}).then(()=>{
              console.log("Task-Deleted");
              res.end();
        });
     });
});


app.post("/useradd", (req, res) => {
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Mobile: req.body.Mobile,
        Email: req.body.Email
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("users").insertOne(user).then(() => {
            console.log("User Added..");
            res.end();
        });
    });


});

app.get("/users/:userid", (req, res) => {

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("users").find({ UserId: req.params.userid }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.delete("/users/:id", (req, res) => {

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("e-com");
        database.collection("users").deleteOne({ UserId: id }).then(() => {
            console.log("Task-Deleted");
            res.end();
        });
    });
});


app.listen(PORT);
console.log(`Server Started : http://127.0.0.1:7000`);