const express = require("express");
const path = require("path");
const http=require('http')
const fs=require('fs')
const port = 80;
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/Contactinspire');
  
}
// Define mongoose schema 
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  institution: String,
  Dob: String
  
});
const Contact = mongoose.model('Contact', ContactSchema);



app.use(express.static(path.join(__dirname + '/public')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/inspire-residential-facility", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});
app.post("/inspire-residential-facility", async (req, res) => {
  const myData= new Contact(req.body);
   await myData.save();
  myData.save().then(()=>{
    res.send("This item has been saved to database")
  }).catch(()=>{
    res.status(400).send("item was not saved to the DatsBase")
  })
  });


  app.listen(80, () => {
    console.log("Application started and Listening on port 80");
  });
