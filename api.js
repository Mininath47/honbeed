var express = require("express");
var cors = require("cors");
require('dotenv').config();
var mongoClient = require("mongodb").MongoClient;
var conString = process.env.DB_URL;
const PORT = process.env.PORT || 7000;


var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true})); 
app.use(express.json());

app.get("/foods", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("foods").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/dairy", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("dairy").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/veg", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("vegetarian").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/drinks", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("drinks").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/foods/:categories", (req, res)=>{

    mongoClient.connect(conString).then(clientObject=>{
            var database  = clientObject.db("e-com");
            database.collection("foods").find({category:req.params.categories}).toArray().then(documents=>{
                res.send(documents);
                res.end();
            });
    });
});
app.get("/users", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.post("/useradd", (req, res)=>{
      var user = {
          UserId: req.body.UserId,
          UserName: req.body.UserName,
          Password: req.body.Password,
          Mobile: req.body.Mobile,
          Email:req.body.Email
      };

      mongoClient.connect(conString).then(clientObject=>{
           var database = clientObject.db("e-com");
           database.collection("users").insertOne(user).then(()=>{
                console.log("User Added..");
                res.end();
           });
      });


});

app.get("/users/:userid", (req, res)=>{

    mongoClient.connect(conString).then(clientObject=>{
            var database  = clientObject.db("e-com");
            database.collection("users").find({UserId:req.params.userid}).toArray().then(documents=>{
                res.send(documents);
                res.end();
            });
    });
});

// app.get("/users/:id", (req, res)=>{

//     mongoClient.connect(conString).then(clientObject=>{
//             var database  = clientObject.db("e-com");
//             database.collection("users").find({UserId:parseInt(req.params.id)}).toArray().then(documents=>{
//                 res.send(documents);
//                 res.end();
//             });
//     });
// });

// app.post("/add-task", (req, res)=>{
//      var task = {
//           Appointment_Id: parseInt(req.body.Appointment_Id),
//           Title: req.body.Title,
//           Description: req.body.Description,
//           Date: new Date(req.body.Date),
//           UserId: req.body.UserId
//      }
//      mongoClient.connect(conString).then(clientObject=>{
//           var database = clientObject.db("sampledb");
//           database.collection("appointments").insertOne(task).then(()=>{
//                console.log("Task Added");
//                res.end();
//           })
//      })
// });

// app.put("/edit-task/:id", (req, res)=>{
//      var id = parseInt(req.params.id);
//      mongoClient.connect(conString).then(clientObject=>{
//             var database = clientObject.db("sampledb");
//             database.collection("appointments").updateOne({Appointment_Id:id},{$set: {Appointment_Id:id, Title:req.body.Title, Description: req.body.Description, Date: new Date(req.body.Date), UserId: req.body.UserId}}).then(()=>{
//                 console.log("Task-Updated");
//                 res.end();
//             });
//      });
// });

app.delete("/users/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("e-com");
        database.collection("users").deleteOne({UserId:id}).then(()=>{
              console.log("Task-Deleted");
              res.end();
        });
     });
});


app.listen(PORT);
console.log(`Server Started : http://127.0.0.1:7000`);