let name={
    fname:"karan",
    lname:"sharma",
    printname:function(){
        console.log(this.fname+" "+this.lname);
    }
}

let name2={
    fname:"jai",
    lname:"sharma"
}
name.printname.call(name2);

name.printname();

function fullname(){
    console.log("hello world");
}
fullname();

fullname2=()=>{
    console.log("hello world2");
}
fullname2();

