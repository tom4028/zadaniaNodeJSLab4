const request = require('request');
const yargs = require('yargs').argv;
const fs = require('fs');
const axios = require('axios');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

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
                    console.log(result.data.username);
                    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                        .then(result=>{
                            let albums = result.data;
                           console.log("Ilośc albumów:",albums);
                            console.log("Tytuł pierwszego albumu: ",albums[0].title);
                            axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
                                .then(result=>{
                                    writeFilePromise('albums.json',JSON.stringify(result.data))
                                        .then(()=>console.log("Done"))
                                        .catch(err=>console.log(err))
                                    })
                                .catch(err=>console.log(err));
                        })
                        .catch(err=>console.log(err));
                })
                .catch(error=>console.log(error));
        }
    }).catch(error=>console.log(error));
