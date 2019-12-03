const mysql = require('mysql')
const express = require('express')
const dotenv = require('dotenv/config')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'auesoftware',
    multipleStatements: true
})
mysqlConnection.connect((err)=> {
    if(!err){
        console.log('Conexão com banco de dados feita com sucesso')
    } else {
        console.log('Conexão com o Banco de dados falhou \n Error:' + JSON.stringify(err, undefined,2))
    }
})

app.listen(5000, ()=> {
    console.log('Server Running on 5000')
})
// pega todos os dados da tabela
app.get('/dados', (req,res)=>{
    mysqlConnection.query('SELECT * FROM dados' ,(err, rows,fields) => {
            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
    })
}
)
// Pegar um dado específico
app.get('/dados/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM dados WHERE ID = ? ', [req.params.id] ,(err, rows,fields) => {
            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
    })
}
)
// Deletar um dado
app.delete('/dados/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM dados WHERE ID = ? ', [req.params.id] ,(err, rows,fields) => {
            if(!err){
                res.send('Deletado com Sucesso')
            } else{
                console.log(err)
            }
    })
}
)
// Inserir um dado
app.post('/dados', (req,res)=>{
    let emp = req.body
    var sql = "SET @ID = ?; SET @Nome =?; SET @Sexo =?; SET @Dia =?; SET @Mes = ?; SET @Ano =?; SET @Cidade = ?; SET @Contato =?;\ CALL DadosAddorEdit(@ID,@Nome,@Sexo,@Dia,@Mes,@Ano,@Cidade,@Contato) "
    mysqlConnection.query(sql, [emp.ID, emp.Nome, emp.Sexo, emp.Dia, emp.Mes, emp.Ano,emp.Cidade,emp.Contato],(err, rows,fields) => {
            if(!err){
                rows.forEach(element =>{
                    if(element.constructor == Array)
                    res.send(emp)
                })
            } else{
                console.log(err)
            }
    })
}
)
// Alterar um dado
app.put('/dados', (req,res)=>{
    let emp = req.body
    var sql = "SET @ID = ?; SET @Nome =?; SET @Sexo =?; SET @Dia =?; SET @Mes = ?; SET @Ano =?; SET @Cidade = ?; SET @Contato =?;\ CALL DadosAddorEdit(@ID,@Nome,@Sexo,@Dia,@Mes,@Ano,@Cidade,@Contato) "
    mysqlConnection.query(sql, [emp.ID, emp.Nome, emp.Sexo, emp.Dia, emp.Mes, emp.Ano,emp.Cidade,emp.Contato],(err, rows,fields) => {
            if(!err)
               res.send(emp)
             else{
                console.log(err)
            }
    })
}
)
app.get('/cidadeb', (req,res)=>{
    var sqlString = "SELECT * FROM dados WHERE Cidade = 'Bicas'"
    mysqlConnection.query(sqlString , [req.params.m] ,(err, rows, fields) => {
            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
    })
}
)
app.get('/cidadej', (req,res)=>{
    var sqlString = "SELECT * FROM dados WHERE Cidade = 'Juiz de Fora'"
    mysqlConnection.query(sqlString , (err, rows, fields) => {
            if(!err){
                res.send(rows)
            } else{
                console.log(err)
            }
    })
}
)



