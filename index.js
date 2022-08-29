const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
db.connect((err) =>{
    if(err){
        throw err
    }
    console.log('server connected to database')
})
app.get('/', (req,res)=>{
    res.send('data has been displayed')
})

app.post('/mascotas/:id', (req, res) => {
    let sql = `SELECT * FROM  mascota WHERE idcliente=${req.body.id}` 
    db.query(sql, (err,result) =>{
        if(err) throw err
        console.log(result)
        res.send(result)
    })
    db.end
} )

app.get('/customers', (req,res)=>{
    let sql = 'SELECT * FROM  cliente'
    db.query(sql, (err,result) =>{
        if(err) throw err
        console.log(result)
        res.send(result)
    })
    db.end
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`)
})
