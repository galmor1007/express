var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/forms", {useNewUrlParser: true, useUnifiedTopology: true })

const questionSchema = new mongoose.Schema({
    question: String,
    answerType: String,
    options: [String]
})

const formSchema = new mongoose.Schema({
    formName: String,
    questions: [questionSchema]
});

var dataInput = mongoose.model("Form", formSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('new-form', { title: 'New Form' });
});

router.post('/save-form', function (req, res) {
    dataInput.create(req.body, function (err, obj) {
        if (err) {
            //This will be executed if create is going bad.
            res.status(400).send("Unable to save to DB. Error: " + err);
        }
        //This code will be executed AFTER SAVE
        res.status(201).send(obj);
    });
})

module.exports = router;
