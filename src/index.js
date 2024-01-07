const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const userFeedbackRoute = require("./routes/user-feedback");

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/user-feedback', userFeedbackRoute);

app.get('/', (req, res) => {
    res.render('pages/index',{error:false})
});

app.listen(port, ()=>{
    console.log(`Express server started on port ${port}`);
});