//The class that inherits the parent class should be able to modify the objects/properties of parent class
//Derived types must be completely substitutable for their base types
//extension of open closed principle
//New derived classed shud just extend without replacing the base functionality

//You should be able to substitute a base type for a sub type

class Rectangle{

    constructor(width, height){
        this._width = width;
        this._height = height;
    }

    get width() {return this._width;}
    get height() {return this._height;}

    set width(value) {return this._width = value;}
    set height(value) {return this._height = value;}

    get area(){
        return this._height * this._width;
    }

    toString(){
        return `${this._height}x${this._width}`;
    }
}

class Square extends Rectangle{
    constructor(size){
        super(size, size);
    }

    set width(value){
       this._width = this._height = value;
    }

    set height(value){
        this._height = this._width = value;
    }
}

let useIt = function(shape){
    let width = shape._width;
    shape.height = 10;

    console.log(`Expected area of width ${10*width} and got ${shape.area}`)
};

let rc = new Rectangle(2,3);
useIt(rc);

let sq = new Square(5);
useIt(sq);