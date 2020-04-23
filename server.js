// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

// pug
app.set('views', './views');
app.set('view engine', 'pug');
// body parse
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
var listTodos = [
  {id: 1, name: 'Đi chợ'},
  {id: 2, name: 'Nấu cơm'},
  {id: 3, name: 'Rửa bát'},
  {id: 4, name: 'Học code ở CodersX'}
]


app.get('/', (req, res) => {
  res.render('index', {
    listTodos: listTodos
  });
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  var matchedTodo = listTodos.filter(function(item){
    return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('index', {
    listTodos: matchedTodo
  })
})

app.get('/todos/create', (req, res) => {
  res.render('create');
})

app.post('/todos/create', (req, res) => {
  listTodos.push(req.body);
  res.redirect('/');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
