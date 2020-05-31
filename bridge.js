//Shapes can be anything ....Square, Circle, Rectangle, Hexogon etc

// How are we going to render it, Raster, Vector etc....we create a bridge between the renderer and the shape.
// so whatever the shape it is, the render method is can be passed through as parameter to the shape instance.

class VectorRenderer {

    renderCircle(radius){
        console.log(`Drawing a circle of radius ${radius}`)
    }

    renderSquare(length){
        console.log()
    }
}

class RasterRenderer {

    renderCircle(radius){
        console.log(`Drawing pixels for a circle of radius ${radius}`)
    }

    renderSquare(length){
        console.log()
    }
}

class Shape {
   constructor(renderer){
      this.renderer = renderer;
   }
}

class Circle extends Shape {

   constructor(renderer, radius){
        super(renderer);
        this.radius = radius;
   }

   draw(){
       this.renderer.renderCircle(this.radius)
   }

   resize(factor){
      this.radius *= factor;
   }
}

let raster = new RasterRenderer();
let vector = new VectorRenderer();

let circle = new Circle(raster, 5); //passing the render method and radius

circle.draw();
circle.resize(2);
circle.draw();

// If we create separate implementations like VectorCircle, VectorSquare, RasterSquare, RasterCircle....this causes state space explosion
// Instead we created scalable classes and bridge it as per requirement