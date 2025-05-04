
let Project_Name_List = ["Forsaken Seas","Hex-okles","Rubber Run","Cargethal","Deus Ex Magica","Fringe Flayer","Grinning Order Cultist","Terraria Boss Remix","Zavel","Watty Vandalisim","Loop Apocolypse"];
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
    date = Date;

    images = [];
    content = [];

    constructor(name,type,genres,medium,roles,date,images,content) {
        this.name = name;
        this.type = type;
        this.genres = genres;
        this.medium = medium;
        this.roles = roles;
        this.date = new Date(date);
        this.images = images;
        this.content = content;
    };

    Get_Date() {
        const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(this.date.getDate()).padStart(2, '0'); // Get the day of the month
        const year = this.date.getFullYear(); // Get the full year
    
        return `${month}/${day}/${year}`; // Construct the formatted date string
    }

    Generate_Carousel(index,selected=true) {
        let carousel = "";
        
        if (selected) {
            carousel = '<div class="f-carousel__slide is-selected" data-index="' + index + '">\n    <a href="#">\n  <img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.Get_Date() + '">\n</a>\n</div>';
        } else {
            carousel = '<div class="f-carousel__slide" data-index="' + index + '">\n    <a href="#">\n  <img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.Get_Date() + '">\n</a>\n</div>';
        }
        
        

        return carousel
    }


    Generate_Listing(type) {
        let listing = ""

        
        if (this.type.includes("Game")) {

            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.Get_Date() + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Game: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Genres: ' + this.genres + '</p>\n' + '		<p>Role(s): ' + this.roles + '</p>\n' + '		<p>Date: ' + this.Get_Date() + '</p>\n' + '	</div>\n' + '</a></section>';

        }else if (this.type.includes("Art")) {
            
            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.Get_Date() + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Name: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Medium: ' + this.medium + '</p>\n' + '		<p>Date: ' + this.Get_Date() + '</p>\n' + '	</div>\n' + '</a></section>';

        } else if (!data[i].type.includes("Game") && !data[i].type.includes("Art")){
            
            listing = '<section class="text_section project_listing"><a href="#">\n'+ "\n" + '	<img src="' + this.images[0] + '" alt="' + this.name + " " + this.type + '; ' + this.Get_Date() + '">\n' + "\n" + '	<div class="grid">\n' + '		<p>Name: '  +  this.name + '</p>\n' + '		<p>Type: ' + this.type + '</p>\n' + '		<p>Medium: ' + this.medium + '</p>\n' + '		<p>Role(s): ' + this.roles + '</p>\n' + '		<p>Date: ' + this.Get_Date() + '</p>\n' + '	</div>\n' + '</a></section>';

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
            
            Projects = Projects.sort((a, b) => a.name.localeCompare(b.name));
            
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
            if (type == "Game" && data[i].type.includes("Game")) {
                current_listings.push(data[i]);

            }else if (type == "Art" && data[i].type.includes("Art")) {
                current_listings.push(data[i]);

            } else if (type == "Misc" && !data[i].type.includes("Game") && !data[i].type.includes("Art")) {
                current_listings.push(data[i]);
            } else if (type == "All") {
                current_carousel.push(data[i]);
            };
        };

        let new_listings = [];

        for (i in current_listings) {
            new_listings.push(current_listings[i].Generate_Listing(type));
        };
    


        let parent = document.getElementById('Project_List');
        
        parent.innerHTML = '<h2 class="spectral-bold padding-seventy-two">Games</h2>\n\n' + new_listings.join('\n');

    } else {
        console.log("No data to process.");
    }
}


async function Create_Carousel(callback) {
    const container1 = document.getElementById("recent-projects-carousel");
    const options1 = {Dots: false, Navigation : {} ,infinite: false, slidesPerPage: 5};
    await new Carousel(container1, options1);
    callback(created=true);
};






async function Populate_Carousels(data,type,featured) {
    if (data) {// Ensure that data is available before processing
        let current_carousel = [];
        console.log(type)
        for (i in data) {
            console.log(!data[i].type.includes("Game"))
            if (type == "Game" && data[i].type.includes("Game")) {
                current_carousel.push(data[i]);

            }else if (type == "Art" && data[i].type.includes("Art")) {
                current_carousel.push(data[i]);

            } else if (type == "Misc" && !data[i].type.includes("Game") && !data[i].type.includes("Art")) {
                current_carousel.push(data[i]);
                console.log(data[i]);
            } else if (type == "All") {
                current_carousel.push(data[i]);
            };
        };
        
        console.log(current_carousel);
        current_carousel.sort((a, b) => b.date - a.date);
        current_carousel.splice(10);

        let new_carousel = [];
        let index = 0;

        while (new_carousel.length <10){
            for (i in current_carousel) {
                if (new_carousel.length <10) {
                    if (index < 4) {
                        new_carousel.push(current_carousel[i].Generate_Carousel(index,true));
                    } else {
                        new_carousel.push(current_carousel[i].Generate_Carousel(index,false));
                    }
                    index +=1;
                }
                
            };
        }

        let parent = document.getElementById('recent-projects-carousel').getElementsByClassName('f-carousel__track')[0];
        parent.innerHTML = new_carousel.join('\n');
        

        const container1 = document.getElementById("recent-projects-carousel");
		const options1 = {Dots: false, Navigation : {} ,infinite: false, slidesPerPage: 5};
		new Carousel(container1, options1);
		



        if (featured) {
            let current_fcarousel = [];
            
            
            for (i in data) {
                if (type == "Game" && data[i].type.includes("Game")) {
                    current_fcarousel.push(data[i]);

                }else if (type == "Art" && data[i].type.includes("Art")) {
                    current_fcarousel.push(data[i]);

                } else if (type == "Misc" && !data[i].type.includes("Game") && !data[i].type.includes("Art")) {
                    current_fcarousel.push(data[i]);
                } else if (type == "All") {
                    current_fcarousel.push(data[i]);
                };
            };

            current_fcarousel = shuffleArray(current_fcarousel);
            current_fcarousel.splice(7);

            let new_fcarousel = [];
            let index = 0;
            
            
            while (new_fcarousel.length <7){
                for (i in current_fcarousel) {
                    if (new_fcarousel.length <7) {
                        if (index < 4) {
                            new_fcarousel.push(current_fcarousel[i].Generate_Carousel(index,true));
                        } else {
                            new_fcarousel.push(current_fcarousel[i].Generate_Carousel(index,false));
                        }
                        index +=1;
                    }
                    
                };
            }
            
            let parent = document.getElementById('featured-projects-carousel').getElementsByClassName('f-carousel__track')[0];
            parent.innerHTML = new_fcarousel.join('\n');
            
            
            const container2 = document.getElementById("featured-projects-carousel");
            const options2 = {Dots: false, Navigation : {} ,infinite: false, slidesPerPage: 5};
            new Carousel(container2, options2);
        }
		

    } else {
        console.log("No data to process.");
    }
}


async function Execute_Listings(type,mode=0,featured=false) {
    try {
        const data = await Gather_Projects(); // Wait for gather projects to complete

        if (mode == 1){ //Listings only
            await Populate_Listings(data,type);         // Wait for test to complete
        } else if (mode == 2){ //Carousels only
            await Populate_Carousels(data,type,featured);         // Wait for test to complete
        } else { // Default to both
            await Populate_Listings(data,type);         // Wait for test to complete
            await Populate_Carousels(data,type,featured);         // Wait for test to complete
        };


    } catch (error) {
        console.error("An error occurred:", error);
    }
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}