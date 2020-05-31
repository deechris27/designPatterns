// you only let one instance of the class to be created.
// When is class is instanciated//referenced, check if there is an instance already if yes return that else create a new one.

class Singleton{

    constructor(){

        if(this.constructor.instance){
            return this.constructor.instance;
        }

        this.constructor.instance = this;
    }

    one(){
       console.log("I'm meant to do something..")
    }

    two(){
       console.log("I'm meant to do something else..")
    }
}

let s1 = new Singleton();
let s2 = new Singleton();

console.log(`Are we both equal ?  ${s1===s2}`);


/* ******************MonoState********************* */

// The data is shared between all instances

class Programmer{

   get name() { 
       return Programmer._name
    }
   set name(val) {
       Programmer._name = val;
   }

   get age() {
      return Programmer._age
   }
   set age(val) {
      Programmer._age = val;
   }

   toString(){
       console.log(`My name is ${this.name} and I'm ${this.age} years old.`)
   }

}

Programmer._age = undefined;   // underscore denotes, we can't use it directly, only through reference.
Programmer._name = undefined;  // age and name will be shared by all instances of Programmer.

let p1 = new Programmer();
p1.name = "Deepak";
p1.age = 28;

let p2 = new Programmer();
p2.name = "Mytidbit";
p2.age = 15;

p1.toString();
p2.toString();