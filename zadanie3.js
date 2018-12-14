function sub(a,b){
    return new Promise((resolve,reject)=>{
        if(a-b<0){
            reject("Wynik jest mniejszy od zera.");
        }else{
            resolve(`Wynik odejmowanie to: ${a-b}`);
        }
    });
};

sub(2,1).then(result=>console.log(result)).catch(err=>console.log(err));