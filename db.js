const mongoose = require('mongoose')
require('dotenv').config()

const { DB_STRING } = process.env

exports.createConnection = () => {
    mongoose.connect(`mongodb://mahesh:Mahesh3332@cluster0-shard-00-00.kjb1q.mongodb.net:27017,cluster0-shard-00-01.kjb1q.mongodb.net:27017,cluster0-shard-00-02.kjb1q.mongodb.net:27017/?ssl=true&replicaSet=atlas-140sev-shard-0&authSource=admin&retryWrites=true&w=majority`, (error) => {
        if (error) {
            console.log('error while connecting with database')
        }
        else {
            console.log('connected with database')
        }
    })
}
