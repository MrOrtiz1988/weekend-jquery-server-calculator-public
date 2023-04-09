$(document).ready(onReady)

function onReady(){
    //I added an event listener  to each operator button
    $('#plus').on('click', add);
    $('#minus').on('click', subtract);
    $('#times').on('click', multiply);
    $('#divide').on('click', divide);
    //This is the event listener for the equals button
    $('#equals').on('click', sendToServer);
    //This is the event listener fo the clear button
    $('#reset').on('click', clear);
}

//I have equation as a global variable
let equation;

//The only this that the clear button does is clear the input fields
function clear(event){
    event.preventDefault();
    $('#num1').val('');
    $('#num2').val('');
}

//sendToServer sends the package of data over to the server
function sendToServer(event){
    event.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/formulate',
        data: equation
    }).then(function(response){
        //Quickly get back what was claculated and display it to the DOM
      getHistory();

    })
}

//getHistory not only gets the answer but also the data history object
//and append it to the unordered list in the html
function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/formulate'
    }).then(function(response){

        $('#history').empty();
        for(let entry of response){
            $('#result').text(entry.answer);
            $('#history').append(`
            <li>${entry.num1} ${entry.operator} ${entry.num2} = ${entry.answer}</li>
            `)
        }
    })
}

//The add, subtract, multiply and divide packages up the data
//to be sent to the server depending on which operator is pressed
//and sets it to the global variable equation
function add(event){
    event.preventDefault();

    const num1 = $('#num1').val();
    const num2 = $('#num2').val();
    const plus = $('#plus').text();

    equation = {
        num1: num1,
        num2: num2,
        operator: plus,
        answer: ''
    };

}

function subtract(event){
    event.preventDefault();

    const num1 = $('#num1').val();
    const num2 = $('#num2').val();
    const minus = $('#minus').text();

    equation = {
        num1: num1,
        num2: num2,
        operator: minus,
        answer: ''
    };

}

function multiply(event){
    event.preventDefault();

    const num1 = $('#num1').val();
    const num2 = $('#num2').val();
    const times = $('#times').text();

    equation = {
        num1: num1,
        num2: num2,
        operator: times,
        answer: ''
    };

}

function divide(event){
    event.preventDefault();

    const num1 = $('#num1').val();
    const num2 = $('#num2').val();
    const divide = $('#divide').text();

    equation = {
        num1: num1,
        num2: num2,
        operator: divide,
        answer: ''
    };

}