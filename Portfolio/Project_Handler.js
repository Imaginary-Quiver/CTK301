
let Project_Name_List = ["Forsaken Seas","Hex-okles","Rubber Run"]
let  Projects = [];

for (i in Project_Name_List) {
    Project_Name_List[i] = "https://imaginary-quiver.github.io/CTK301/Portfolio/Projects/" + Project_Name_List[i] + ".txt"
}




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
    date = "";

    images = [];
    content = [];

    constructor(name,type,genres,medium,roles,date,images,content) {
        this.name = name;
        this.type = type;
        this.genres = genres;
        this.medium = medium;
        this.roles = roles;
        this.date = date;
        this.images = images;
        this.content = content;
    };

    Generate_Listing(type) {
        let listing = ""


        if (type = "Game" && this.type.includes("Game")) {

            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.date + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Game: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Genres: ' + this.genres + '</p>\n' + '		<p>Role(s): ' + this.roles + '</p>\n' + '		<p>Date: ' + this.date + '</p>\n' + '	</div>\n' + '</a></section>';

        }else if (type = "Art" && this.type.includes("Art")) {
            
            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.date + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Name: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Medium: ' + this.medium + '</p>\n' + '		<p>Date: ' + this.date + '</p>\n' + '	</div>\n' + '</a></section>';

        } else {
            
            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.date + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Name: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Medium: ' + this.medium + '</p>\n' + '		<p>Role(s): ' + this.roles + '</p>\n' + '		<p>Date: ' + this.date + '</p>\n' + '	</div>\n' + '</a></section>';

        };


        return listing
    }

    
};







async function Gather_Projects(){
    Projects = [];
    for (i in Project_Name_List){
        try {
            const data = await (await fetch(Project_Name_List[i])).text(); //Get data from web text file and wait for it to return


            let Project_Contents = [];

            data.split('\n').forEach(line => {
                Project_Contents.push(line.trim()); // Populate the array with trimed text
            });

            Project_Contents[6] = Project_Contents[6].split(","); //extract images into array

            let contents = Project_Contents.slice(7).join('\n');
            Project_Contents.splice(8);
            Project_Contents[7] = contents;
            

            Projects.push(new Project(Project_Contents[0],Project_Contents[1],Project_Contents[2],Project_Contents[3],Project_Contents[4],Project_Contents[5],Project_Contents[6],Project_Contents[7]));
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        };
    }


    return Projects
};


async function Populate_Listings(data,type) {
    
    if (data) {// Ensure that data is available before processing
        

        let current_listings = [];

        for (i in data) {
            if (type = "Game" && data[i].type.includes("Game")) {
                current_listings.push(data[i]);
            }else if (type = "Art" && data[i].type.includes("Art")) {
                current_listings.push(data[i]);
            } else {
                current_listings.push(data[i]);
            };
        };

        let new_listings = [];

        for (i in current_listings) {
            new_listings.push(current_listings[i].Generate_Listing());
        };
    


        let parent = document.getElementById('Project_List');
        
        parent.innerHTML = '<h2 class="spectral-bold padding-seventy-two">Games</h2>\n\n' + new_listings.join('\n');

    } else {
        console.log("No data to process.");
    }
}

async function Execute_Listings(type) {
    try {
        const data = await Gather_Projects(); // Wait for gather projects to complete

        await Populate_Listings(data,type);         // Wait for test to complete
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

