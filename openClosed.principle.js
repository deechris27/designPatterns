// Objects are open for extension but closed for modification
// extension would mean inheritance - allowed but not adding additional functionalities 
// to the same class or function

let Color = Object.freeze({red: 'red', green: 'green', blue: 'blue'});

let Size = Object.freeze({small: 'small', medium: 'medium', large: 'large'});

class Product{

    constructor(name, color, size){
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter{
    filterByColor(products, color){
        return products.filter(p=> p.color === color);
    }

    //This is additional functionality which is modification that violates ocp
    filterBySize(products, size){
        return products.filter(p=>p.size===size);
    }

    //another modification 
    filterBySizeAndColor(products, size, color){
        return products.filter(p=> p.size===size && p.color===color);
    }

    //adding additional functionalities like this would lead to multiple functions
    //stuffed in one class making things tedious - state space explosion
}

//Abstraction
class Specification{
    constructor(){
        if(this.constructor.name==='Specification'){
            throw new Error('Specification is abstract');
        }
    }

    isSatisfied(item){}
}

//Technically everything works fine without abstract implementation
//We don't need abstract class
class ColorSpecification extends Specification {
    constructor(color){
        super();
        this.color = color;
    }

    isSatisfied(item){
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size){
        this.size = size;
    }

    isSatisfied(item){
        return item.size === this.size;
    }
}

class AndSpecification{
    constructor(...specs){
        this.specs = specs;
    }

    isSatisfied(item){
        return this.specs.every(x=> x.isSatisfied(item));
    }
}

let fruit = new Product('Apple', Color.red, Size.small);
let tree = new Product('Tree', Color.red, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [fruit, tree, house];

let pf = new ProductFilter();

for(let p of pf.filterByColor(products, Color.red)){
    //console.log(`* ${p.name} is red`);
}

class BetterFilter{
    filter(items, spec){
        return items.filter(x=>spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();

for(let p of bf.filter(products, new ColorSpecification(Color.red))){
    //console.log(`* ${p.name} is red`);
}

let and = new AndSpecification(new ColorSpecification(Color.red), new SizeSpecification(Size.large));

for(let p of bf.filter(products, and)){
    console.log(`* ${p.name} is large and red`);
}