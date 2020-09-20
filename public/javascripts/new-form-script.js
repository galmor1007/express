let defaultForm = {
    name: 'form 1 example',
    questions: [
        {
            question: 'What is your name?',
            answerType: 'text',
            options: []
        },
        {
            question: 'How old are you?',
            answerType: 'number',
            options: []
        },
        {
            question: 'When is your birthday?',
            answerType: 'date',
            options: []
        },
        {
            question: 'Did you enjoy your last birthday?',
            answerType: 'multipleChoice',
            options: [
                'yes',
                'no'
            ]
        }
    ]
}

let sendDefaultForm = function() {
    sendForm(defaultForm);
};

let sendForm = function(form) {
    console.log('Sending form to server:');
    console.log(JSON.stringify(form));

    let request = $.post({
        url: '/new-form/save-form',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(form)
    });

    request.done(function(response, textStatus, jqXHR) {
        console.log('Server response:');
        console.log(JSON.stringify(response));
        alert('Form saved with ID: ' + response._id);
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
}