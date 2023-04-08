const express = require('express');

let bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let history = [];

function calculate(){
    let lastOfHistory = history[history.length - 1];
    if(lastOfHistory.operator === '+'){
         lastOfHistory.answer = Number(lastOfHistory.num1) + Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '-'){
        lastOfHistory.answer = Number(lastOfHistory.num1) - Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '*'){
        lastOfHistory.answer = Number(lastOfHistory.num1) * Number(lastOfHistory.num2);
    }else if(lastOfHistory.operator === '/'){
        lastOfHistory.answer = Number(lastOfHistory.num1) / Number(lastOfHistory.num2);
    }
}

app.get('/formulate', (req, res) => {
    calculate();
    res.send(history);
})

app.post('/formulate', (req, res) => {
    let newItem = req.body;
    history.push(newItem)

    res.sendStatus(201);
})

app.get('/history', (req, res) => {
      res.send(history);
  })

app.listen(5000, () => {console.log('Server Running on port 5000')});