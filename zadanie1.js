const myPromise =()=>{
    return new Promise((res,rej)=>{
        res("Promise działa...");
    })
}

myPromise().then(result=>console.log(result));