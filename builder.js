// When you create a class with a constructor that takes multiple paremeters
// like name, age, address, qualification, marital status etc..
// It becomes hard to know their order when we create an instance of that class
// it becomes more tedious if the parameters are more

class Person{

    constructor(name, age){
       this._name = name;
       this._age = age;
    }

    setAddress(val){
        this._address = val;
    }

    setQualification(val){
        this._qualification = val;
    }

    setMaritalStatus(val){
        this._maritalStatus = val;
    }

    toString(){
        console.log(`I'm ${this._name}, my age is ${this._age} and I'm ${this._maritalStatus}`)
    }
}

let p1 = new Person("Deepak", "28");

p1.setMaritalStatus('Single');
p1.toString();

/* **************Builder****************** */

const header = "Mytidbit";

let html = [];

html.push('<p>');
html.push(header);
html.push('</p>');
console.log(html.join(''));

const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for(let word of words){
    html.push(` <li>${word}</li>\n`)
}
html.push('</ul>');
console.log(html.join(''));

// The above is a simple example of generating a html programmatically
// we can have multiple tags inside one tag, it may vary. Spacing etc.
// we need a class that scales accordingly with the parameters/tags.

class Tag {

    static get indentSize() { return 2; };

    constructor(name="", text=""){
        this._name = name;
        this._text = text;
        this._children = [];
    }

    toStringCustom(space){
       let html = [];
       let i = " ".repeat(space * Tag.indentSize);
       html.push(`${i}<${this.name}>\n`);
       if(this.text.length > 0){
           html.push(" ".repeat(Tag.indentSize * space+1));
           html.push(this._text);
           html.push('\n');
       }

       for(let child of this._children){
           html.push(child.toStringCustom(space+1))
       }

       html.push(`${i}</${this._name}>\n`);
       return html.join();
    }

    toString(){
        return this.toStringCustom(0);
    }

    static create(name){
       return new HtmlBuilder(name);
    }
}

class HtmlBuilder{

    constructor(rootName){
        this._root = new Tag(rootName);
        this._rootName = rootName;
    }

    addChild(childName, childText){
        let child = new Tag(childName, childText);
        this._root._children.push(child);
    }

    toString(){
        return this._root.toString();
    }

    build(){
        return this._root;
    }
}

let builder = new HtmlBuilder('ul');
for(let word of words){
    builder.addChild('li', word);
}

console.log(builder._root.toStringCustom(1));