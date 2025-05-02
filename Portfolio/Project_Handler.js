var fs = require('fs');
var files = fs.readdirSync('/Projects/');


const Content_Types = Object.freeze({
    Text_Section: 0,
    Image_Left_Text_Section: 1,
    Image_Right_Text_Section: 2,
});

class Project {
    name = "";
    type = "";
    genres = "";
    medium = "";
    roles = "";
    date = Date;

    content = [];

    constructor(name,type,genres,medium,roles,date,content) {
        this.name = name;
        this.type = type;
        this.genres = genres;
        this.medium = medium;
        this.roles = roles;
        this.date = date;
        this.content = content;
    };

    Generate_Listing() {
        return this.name + " " + this.type + " " + this.genres + this.medium + " " + this.roles + " " + this.date.toLocaleDateString()
    }

    Gather_Projects(){
        for (i in files){
            return i
        }

    }
};
