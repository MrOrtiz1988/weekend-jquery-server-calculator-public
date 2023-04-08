const express = require('express');

let bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let history = [];
// let lastOfHistory = history[history.length - 1];

function calculate(){
    let lastOfHistory = history[history.length - 1];
    if(lastOfHistory.operator === '+'){
         return Number(lastOfHistory.num1) + Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '-'){
        return Number(lastOfHistory.num1) - Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '*'){
        return Number(lastOfHistory.num1) * Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '/'){
        return Number(lastOfHistory.num1) / Number(lastOfHistory.num2);
    }
}

app.get('/formulate', (req, res) => {
  let result = calculate();
    res.send({result});


})

app.post('/formulate', (req, res) => {
    let newItem = req.body;
    history.push(newItem)
    console.log(history);

    res.sendStatus(201);
})

app.listen(5000, () => {console.log('Server Running on port 5000')});