let name={
    name:"karan",
    age:20
}

function printname(){
    console.log(this.name)
}
//not work , arrow func -this is lexically bound, meaning it does not depend on how the function is called.

printage=()=>{
    console.log(this.age)
}

printname.call(name)
printage.call(name)

let printage2=function(){
    console.log(this.age)
}
printage2.call(name)