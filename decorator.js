// A class/object should be open to extention and closed for modification
// The below base class is inherited by Circle which implements resize functionality
// If we want to add coloring functionality, then we have to do so by not being intrusive.
// adding a color property to base class and adding additional method to Circle class in modification that violates
// open-closed principle.

class Shape{

}

class ColoredShape extends Shape{    //A decorator

    constructor(shape, color){
        super();
        this.color = color;
        this.shape = shape;
    }

    toString(){
        return `${this.shape.toString()} has the color ${this.color}`;
    }
}

class TransparentShape extends Shape{

    constructor(shape, transparency){
        super();
        this.shape = shape;
        this.transparency = transparency;
    }

    toString(){
        return `${this.shape.toString()} also has a transparency of ${this.transparency * 100.0}%`
    }
}

class Circle extends Shape{

    constructor(radius=0){
        super();
        this.radius = radius;
    }

    resize(factor){
       this.radius *= factor
    }

    toString(){
        return `A circle of radius ${this.radius}`
    }
}

let circle = new Circle(2);
circle.toString();

let redCircle = new ColoredShape(circle, 'red');
redCircle.shape.resize(2);  // very important thing...use the underlying shape passed
redCircle.toString();

let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());