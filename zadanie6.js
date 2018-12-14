const request = require('request');
const yargs = require('yargs').argv;

const url = "https://jsonplaceholder.typicode.com/users/";
const appid = "5c93c428e6adf538aadd8d533068be7b";

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
};

getWeather = (user)=>{
    return new Promise((resolve,reject)=>{
        if(!user){
            reject("Nie ma takiego użytkownika");
        }else{
            let geo = user.address.geo;
            let lat = geo.lat;
            let lng = geo.lng;
            const optionsWeather = {
                method:'GET',
                uri:`https://api.openweathermap.org/data/2.5/weather?appid=${appid}&lat=${lat}&lon=${lng}`
            };
            request(optionsWeather,(err,response,body)=>{
                if(!err){
                    let weather = body;
                    resolve(weather);
                }
            });    
        }
    });
}

const app = ()=>{
    let userId = yargs.userId;
    if(!userId){
        usersLength().then(text=>console.log(text)).catch(err=>console.log(err));
    }else{
        getUser(userId)
            .then(user=>getWeather(user)
                .then(weather=>console.log(weather))
                .catch(err=>console.log(err)))
            .catch(err=>console.log(err));
    }
}

app();