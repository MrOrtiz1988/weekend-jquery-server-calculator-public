$(document).ready(onReady)

function onReady(){
    console.log('hello from jq!');
    $('#plus').on('click', add);
    $('#minus').on('click', subtract);
    $('#times').on('click', multiply);
    $('#divide').on('click', divide);
    $('#equals').on('click', sendToServer);
}

let equation;

function sendToServer(event){
    event.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/formulate',
        data: equation
    }).then(function(response){

         $.ajax({
        method: 'GET',
        url: '/formulate'
    }).then(function(response){
        getHistory();
    })

    })

   
}

function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response){
        $('#history').empty();
        for(let entry of response){
            $('#result').text(entry.answer);
            $('#history').append(`<li>${entry.num1} ${entry.operator} ${entry.num2} = ${entry.answer}</li>`)
        }
       
    })
}

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