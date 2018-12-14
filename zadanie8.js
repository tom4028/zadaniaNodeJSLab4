const request = require('request');
const yargs = require('yargs').argv;
const fs = require('fs');
const axios = require('axios');

const appid = "5c93c428e6adf538aadd8d533068be7b";


axios.get('https://jsonplaceholder.typicode.com/users/')
    .then(function(response){
        let users = response.data;
        let userId = yargs.userId;
        if(!userId){
            console.log(`Wpisz numer użytkowanika --userId (1-${users.length})`);
        }else{
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then((result)=>{
                    let user = result.data;
                    let geo = user.address.geo;
                    let lat = geo.lat;
                    let lng = geo.lng;
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${appid}&lat=${lat}&lon=${lng}`)
                        .then(result=>{
                            console.log(result.data);
                            fs.writeFile('pogoda8.json',JSON.stringify(result.data),(err)=>{
                                if(!err){
                                    console.log("Dane zapisane do pliku...");
                                }
                            });
                        })
                        .catch(error=>console.log(error));
                })
                .catch(error=>console.log(error));
        }
    }).catch(error=>console.log(error));
