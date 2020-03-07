//A class or function should have a single primary responsibility 
//it can only accept change if the reason for change is related to its primary resposibility

const fs = require('fs');

class Journal{

    constructor(){
        this.entries = {};
    }

    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index){
        delete this.entries[index];
    }

    toString(){
        return Object.values(this.entries).join('\n');
    }
}
Journal.count = 0;

let test = new Journal();
test.addEntry('Bought a new domain');
test.addEntry('Added few to my lists');

//Other responsibility
class Persist{

    saveToFile(journal, filename){
        fs.writeFileSync(filename, journal.toString());
    }
}

let save = new Persist();
let filename = 'c:/temp/Journal.txt';
save.saveToFile(test, filename);

// We could add additional functions to persist these entries into a file
// but that becomes additional resposibility, it might require additional functions to format, serialize etc before writing into fs

//Ansi pattern to this will have a god object with all the responsibilities in one class
//Another tern for single resp principle is separation of concerns

console.log(test.toString());