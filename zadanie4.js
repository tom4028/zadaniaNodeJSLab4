const request = require('request');
const yargs = require('yargs').argv;

const url = "https://jsonplaceholder.typicode.com/users/";


const options={
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    },
    url:url
}

const usersLength = ()=>{
    return new Promise((resolve,reject)=>{
        request(options,function(error,response,body){
            if(!error && response.statusCode ==200){
                let users = JSON.parse(body);
                let text = `Wpisz numer użytkowanika: --userId (1-${users.length})`;
                resolve(text);
            }else{
                reject({Error:"Nie pobrano danych."});
            }
        })
    });
};

const  getUser = (userId)=>{
    return new Promise((resolve,reject)=>{
        request(`https://jsonplaceholder.typicode.com/users/${userId}`,function(err,response,body){
            if(!err && response.statusCode ==200){
                let user = JSON.parse(body);
                resolve(user);
            }else{
                reject({Error:"No user in data base."})
            }
        })
    });
}

const app = ()=>{
    let userId = yargs.userId;
    if(!userId){
        usersLength().then(text=>console.log(text)).catch(err=>console.log(err));
    }else{
        getUser(userId).then(user=>console.log(user)).catch(err=>console.log(err));
    }
}

app();