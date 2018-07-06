const util =  require('util');
const promosify = util.promisify;
const mongodb = require('mongodb');
const myClient = mongodb.MongoClient;
const myConnect = promosify(myClient.connect);
const url = 'mongodb://localhost:27017/';

class Connection{
    constructor(){
        myConnect(url)
        .then((obj)=>{
            if(obj != null){
                console.log(`Connection DB successful`);
                this.connection = obj;
                this.db = obj.db('MyFirstDataBase');
            }else{
                console.log(`Connection failed`);
                this.connection = {};
            }
        })
        .catch((err)=>console.log(`Error System : ${err}`));
    }
}

module.exports = new Connection();