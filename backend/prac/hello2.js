let detail={
    name:"karan",
    age:20,
    gender:"male",
    printage:function(){
        console.log(this.age)
    }

}

function printname(msg){
    console.log(msg+this.name)
}


let detail2={
    name:"akram",
    age:23,
    gender:"male"
}

printname.call(detail2,"hello ")

detail.printage.call(detail2)
//new copy of the function is created and this is binded to the object passed in the bind function
const getage=detail.printage.bind(detail2)
getage()

