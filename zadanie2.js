const myPromise =()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("Hello World!");
        },5000);
    })
}

myPromise().then(result=>console.log(result));