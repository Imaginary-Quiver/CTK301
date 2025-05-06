
let Project_Name_List = ["Forsaken Seas","Hex-okles","Rubber Run","Cargethal","Deus Ex Magica","Fringe Flayer","Grinning Order Cultist","Terraria Boss Remix","Zavel","Watty Vandalisim","Loop Apocolypse"];
let  Projects = [];


for (i in Project_Name_List) {
    Project_Name_List[i] = "https://imaginary-quiver.github.io/CTK301/Portfolio/Projects/" + Project_Name_List[i] + ".txt"
}

const Section_Types = new Map([
    ["title_section",".ts"],
    ["header_section",".hs"],
    ["text_section", ".txts"],
    ["link_section", ".lnks"],
    ["image_left_text_section", ".ilts"],
    ["image_right_text_section", ".irts"],
    ["video_left_text_section", ".vlts"],
    ["video_right_text_section", ".vrts"],
    ["audio_left_text_section",".alts"],
    ["audio_right_text_section",".arts"]
]);

function Get_Section(value) {
    for (const [key, val] of Section_Types.entries()) {
        if (val === value) {
            return key; // Return the key if the value matches
        }
    }
    return null; // Return null if the value is not found
}


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

    Get_Link(){
        let link = `Project_Page.html?project=${this.name.replaceAll(" ","_")}`;

        return link
    }

    Generate_Carousel(index,selected=true) {
        let carousel = "";
        
        if (selected) {
            carousel = `<div class="f-carousel__slide is-selected" data-index="${index}">\n    <a href="${this.Get_Link()}">\n  <img src="${this.images[0]}" alt="${this.name} ${this.type}; ${this.Get_Date()}">\n</a>\n</div>`;
        } else {
            carousel = `<div class="f-carousel__slide" data-index="${index}">\n    <a href="${this.Get_Link()}">\n  <img src="${this.images[0]}" alt="${this.name} ${this.type}; ${this.Get_Date()}">\n</a>\n</div>`;
        }
        
        

        return carousel
    }


    Generate_Listing(type) {
        let listing = ""

        
        if (this.type.includes("Game")) {

            listing = `<section class="text_section project_listing"><a href="${this.Get_Link()}">\n\n  <img src="${this.images[0]}" alt="${this.name} ${this.type}; ${this.Get_Date()}">\n\n	<div class="grid">\n		<p>Game: ${this.name}</p>\n		<p>Type: ${this.type}</p>\n		<p class="Genres">Genres: ${this.genres}</p>\n		<p>Role(s): ${this.roles}</p>\n		<p>Date: ${this.Get_Date()}</p>\n	</div>\n    </a></section>`;

        }else if (this.type.includes("Art")) {
            
            listing = `<section class="text_section project_listing"><a href="${this.Get_Link()}">\n\n  <img src="${this.images[0]}" alt="${this.name} ${this.type}; ${this.Get_Date()}">\n\n	<div class="grid">\n		<p>Name: ${this.name}</p>\n		<p>Type: ${this.type}</p>\n		<p>Medium: ${this.medium}</p>\n		<p>Date: ${this.Get_Date()}</p>\n	</div>\n</a></section>`;

        } else if (type == "Misc"){
            
            listing = `<section class="text_section project_listing"><a href="${this.Get_Link()}">\n\n  <img src="${this.images[0]}" alt="${this.name} ${this.type}; ${this.Get_Date()}">\n\n	<div class="grid">\n		<p>Name: ${this.name}</p>\n		<p>Type: ${this.type}</p>\n		<p>Medium: ${this.medium}</p>\n		<p>Role(s): ${this.roles}</p>\n		<p>Date: ${this.Get_Date()}</p>\n	</div>\n</a></section>`;

        };


        return listing
    }

    Generate_Heading() {
        let Heading = ""

        
        if (this.type.includes("Game")) {
            
            Heading = `<section class="header_section">\n\n	<div class="grid">\n		<p class="span3">Type: ${this.type}</p>\n		<p class="span3">Date: ${this.Get_Date()}</p>\n		<p class="span6">Role(s): ${this.roles}</p>\n		<p class="span12">Genres: ${this.genres}</p>\n    	</div>\n</a></section>`;

        }else if (this.type.includes("Art")) {
            
            Heading = `<section class="header_section">\n\n	<div class="grid">\n		<p class="span3">Type: ${this.type}</p>\n		<p class="span6">Medium: ${this.medium}</p>\n		<p class="span3">Date: ${this.Get_Date()}</p>\n	</div>\n</a></section>`;

        } else if (!this.type.includes("Game") && !this.type.includes("Art")){
            
            Heading = `<section class="header_section">\n\n	<div class="grid">\n		<p class="span3">Type: ${this.type}</p>\n		<p class="span6">Medium: ${this.medium}</p>\n		<p class="span3">Date: ${this.Get_Date()}</p>\n		<p class="span6">Role(s): ${this.roles}</p>\n	</div>\n</a></section>`;

        };


        return Heading
    } 
};







async function Gather_Projects(){
    Projects = [];
    for (i in Project_Name_List){
        try {
            const data = await (await fetch(Project_Name_List[i])).text(); //Get data from web text file and wait for it to return


            let Project_Contents = [];

            data.split('\n').forEach(line => {
                Project_Contents.push(line.trimEnd()); // Populate the array with trimed text
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
        
        parent.innerHTML = `<h2 class="spectral-bold padding-seventy-two">Games</h2>\n\n${new_listings.join('\n')}`;

    } else {
        console.log("No data to process.");
    }
}







async function Populate_Carousels(data,type,featured) {
    if (data) {// Ensure that data is available before processing
        let current_carousel = [];

        for (i in data) {

            if (type == "Game" && data[i].type.includes("Game")) {
                current_carousel.push(data[i]);

            }else if (type == "Art" && data[i].type.includes("Art")) {
                current_carousel.push(data[i]);

            } else if (type == "Misc" && !data[i].type.includes("Game") && !data[i].type.includes("Art")) {
                current_carousel.push(data[i]);
                
            } else if (type == "All") {
                current_carousel.push(data[i]);
            };
        };
        
        
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





async function Populate_Project_Page(data) {
    
    if (data) {// Ensure that data is available before processing
        let project = Get_Project_From_URL().replaceAll("_"," ");

        let current_project = "";
        
        for (i in data) {
            if (data[i].name == project){
                current_project = data[i]
            };
        };


        let project_content = current_project.content.split("\n"); //get content as array of strings for each line

        project_content = project_content.filter(item => item.trim() !== ""); // remove all blank lines

        let content_sections = [];
        let html_sections = [];
        
        for (i in project_content){
            if (Get_Section(project_content[i]) != null){
                
                content_sections.push([Get_Section(project_content[i]),[]]);
            } else if ( Get_Section(project_content[i]) == null) {
                content_sections[content_sections.length-1][1].push(project_content[i]);
            } else {
                console.log("Project Content Error");
            };
            
        };

        for (i in content_sections){
            let html = "";
            if (content_sections[i][0] == "title_section") {
                html = `<section class="title_section">\n    <h2>${content_sections[i][1][0]}</h2>\n   </section>`;

            } else if (content_sections[i][0] == "header_section") {
                html = `<section class="header_section">\n    <h3>${content_sections[i][1][0]}</h3>\n   </section>`;

            } else if (content_sections[i][0] == "text_section") {
                html = `<section class="text_section">\n    <p> ${content_sections[i][1].join("\n")}</p>\n   </section>`;

            } else if (content_sections[i][0] == "link_section") {
                let link = content_sections[i][1][0];
                content_sections[i][1].splice(0,1);

                html = `<section class="link_section">\n    <p><a href="${link}" target="_blank">${content_sections[i][1].join("\n")}<a></p>\n   </section>`;

            } else if (content_sections[i][0] == "image_left_text_section") {
                let img = content_sections[i][1][0];
                content_sections[i][1].splice(0,1);

                html = `<section class="image_left_text_section">\n    <img src="${img}" alt="${img.substring(img.lastIndexOf("/")+1)}">\n   <p>    ${content_sections[i][1].join("\n")}</p>\n   </section>`;

            } else if (content_sections[i][0] == "image_right_text_section") {
                let img = content_sections[i][1][0];
                
                content_sections[i][1].splice(0,1);
                html = `<section class="image_right_text_section">\n    <p> ${content_sections[i][1].join("\n")}</p>\n   <img src="${img}" alt="${img.substring(img.lastIndexOf("/")+1)}">\n   </section>`;

            } else if (content_sections[i][0] == "video_left_text_section") {
                let video = content_sections[i][1][0];
                content_sections[i][1].splice(0,1);


                html = `<section class="video_left_text_section">\n    <video autoplay controls loop preload="auto" >\n     <source src="${video}" type="video/mp4">\n    </video>\n   <p>  ${content_sections[i][1].join("\n")}</p>\n   </section>`;

            } else if (content_sections[i][0] == "video_right_text_section") {
                let video = content_sections[i][1][0];
                content_sections[i][1].splice(0,1);

                html = `<section class="video_right_text_section">\n    <p> ${content_sections[i][1].join("\n")}</p>\n   <video autoplay controls loop preload="auto" >\n     <source src="${video}" type="video/mp4">\n    </video>\n   </section>`;

            } else if (content_sections[i][0] == "audio_left_text_section") {
                let audio = content_sections[i][1][0];
                
                content_sections[i][1].splice(0,1);
                html = `<section class="audio_left_text_section">\n    <audio controls autoplay >\n     <source src="${audio}" type="audio/mpeg">\n    </audio>\n   <p> ${content_sections[i][1].join("\n")}</p>\n   </section>`;

            } else if (content_sections[i][0] == "audio_right_text_section") {
                let audio = content_sections[i][1][0];
                content_sections[i][1].splice(0,1);

                html = `<section class="audio_right_text_section">\n    <p> ${content_sections[i][1].join("\n")}</p>\n   <audio controls autoplay >\n     <source src="${audio}" type="audio/mpeg">\n    </audio>\n   </section>`;

            } else {
                console.log("Error; Incorrect Section Type");
                html = "";
            };


            html_sections.push(html);
        };






        let parent = document.getElementById('main');
        
        parent.innerHTML = `<section class="title_section">\n   <h2>${current_project.name}</h2></section>\n   ${current_project.Generate_Heading()}\n ${html_sections.join("\n")}`;

    } else {
        console.log("No data to process.");
    };
};









async function Execute_Listings(type,mode=0,featured=false) {
    try {
        const data = await Gather_Projects();                       // Wait for gather projects to complete

        if (mode == 1){                                             // Listings only
            await Populate_Listings(data,type);                     // Wait for Listings to complete
        } else if (mode == 2){                                      // Carousels only
            await Populate_Carousels(data,type,featured);           // Wait for Carousels to complete
        }else if (mode == 3){                                       // Project Page
            await Populate_Project_Page(data);                      // Wait for Project Page to complete
        } else {                                                    // Default to both
            await Populate_Listings(data,type);                     // Wait for Listings to complete
            await Populate_Carousels(data,type,featured);           // Wait for Carousels to complete
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
};



function Get_Project_From_URL() {
    const url = new URL(window.location.href); // Get the current URL
    const params = new URLSearchParams(url.search); // Create a URLSearchParams object

    // Get specific parameters
    const project = params.get('project'); // Get the value of 'project'

    
    return project // Return the project
};


