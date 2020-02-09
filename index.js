const express = require('express');
const handlebars = require('express-handlebars');

const {getAllMessages, saveAllMessages, findMaxId } = require('./messages.js');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    const messages = getAllMessages();
response.render('home', {messages: messages});
});

app.post('/new', (request, response) => {
    const messages = getAllMessages();


app.post('/message', (request, response) => {
    messages = getAllMessages();
})

messages.push({
    author: request.body.author,
    text: request.body.text,
    date: new Date(),
});

saveAllMessages(messages);

response.redirect('/');
});

// html forms don't support method DELETE, so we unluckily have to take a POST on a path /delete
app.post('/delete', (request, response) => {
    let messages = getAllMessages();

const id = request.body.id;

messages = messages.filter(message => message.id != id);

saveAllMessages(messages);

response.redirect('/');
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});