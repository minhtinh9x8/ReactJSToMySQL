const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tinh123',
    database: 'reactjs'
});

connection.connect(function(err){
    if (err) throw err;
  console.log("Connected!!!")
});

app.get('/api/task', (req, res) => {
    var sql = "SELECT * FROM task";
    connection.query(sql,function(err,results){
        if (err) throw err;
        res.json({task: results});
    });
  });

  app.post('/api/insert', function(req,res){
    var sql = "INSERT INTO task(ID,Name,Status) VALUES('"
                + req.body.ID + "','"
                + req.body.Name + "','"
                + req.body.Status + "')";
    connection.query(sql,function (err,results) {
      if(err) throw err;
      res.json({task: results});
    });
  });

  app.post('/api/edit', (req, res) => {
    var sql = "UPDATE task SET "
            +   "Name='"+req.body.Name+"',"
            +   "Status='"+req.body.Status+"'"
            + "WHERE ID='"+req.body.ID+"'";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json({news: results});
    });
  });

  app.post('/api/delete', (req, res) => {
    var sql = "DELETE FROM task "
            + "WHERE ID='"+req.body.ID+"'";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json({news: results});
    });
  });

app.listen(4000, () => console.log('App listening on port 4000'));