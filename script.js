function properGreeting() {
    /**
     * Gets the Hour of the current and displays the message depending on the time of day
     */

    var message = document.getElementById('greeting-message');
    var d = new Date();
    var hour = d.getHours();

    if (hour < 12) {
        message.innerHTML = "Good Morning☀️";
    } else if (hour < 18) {
        message.innerHTML = "Good Afternoon🕑";
    } else {
        message.innerHTML = "Good Evening🌃"
    }
}

properGreeting();


function heartCheckbox () {
    // /* 
    // * Something
    //  */
    // console.log("It was clicked")
    var redHeart = document.getElementById('red-heart');
    var greyHeart = document.getElementById('grey-heart');

    if (greyHeart.style.display === 'block') {
        greyHeart.style.display = "none";
        redHeart.style.display = "block";
    } else {
        greyHeart.style.display = "block";
        redHeart.style.display = "none";
    }

}

function returnHome () {
    var homeContainer = document.getElementById('home-container');
    var aboutMeContainer = document.getElementById('about-me-container');
    var contactMeContainer = document.getElementById('contact-me-container'); 
    var sectionTwoContainer = document.getElementById('section-two-container');
    var firesafeContainer = document.getElementById('firesafe-container');
    var froggyJumperContainer = document.getElementById('froggy-jumper-container');
    var spotifyPortfolioContainer = document.getElementById('spotify-portfolio-container');
    var dropdownContainer = document.getElementById('dropdown');
    var techTools = document.getElementById("tech-tools");

    homeContainer.style.display = "flex";
    techTools.style.display = "flex";
    aboutMeContainer.style.display = "none";
    contactMeContainer.style.display = "none";
    sectionTwoContainer.style.display = "none";
    firesafeContainer.style.display = "none";
    froggyJumperContainer.style.display = "none";
    spotifyPortfolioContainer.style.display = "none";
    dropdownContainer.style.display = "none";
}

function HidingContainers(chosenContainerID) {

    var clickedContainer = document.getElementById(chosenContainerID);
    var homeContainer = document.getElementById('home-container');

    clickedContainer.style.display = "flex";
    homeContainer.style.display = "none";

}


document.getElementById("backward-button").addEventListener("click", returnHome());




function dropdownMenu() {
    //* I am going to end it all !1!1!!!1! this function sucks weiner 
    
    var menu = document.getElementById("dropdown");
    var techTools = document.getElementById("tech-tools");
    var techToolsTitle = document.getElementById("tech-tools-title");
    var homeContainer = document.getElementById('home-container');
    var aboutMeContainer = document.getElementById('about-me-container');
    var contactMeContainer = document.getElementById('contact-me-container'); 
    var sectionTwoContainer = document.getElementById('section-two-container');
    var firesafeContainer = document.getElementById('firesafe-container');
    var froggyJumperContainer = document.getElementById('froggy-jumper-container');
    var spotifyPortfolioContainer = document.getElementById('spotify-portfolio-container');
    
    if (menu.style.display == "block") {
        menu.style.display = "none";
        techTools.style.display = "flex";
        // techToolsTitle.style.display = "flex";

    } else {
        techTools.style.display = "none";
        // techToolsTitle.style.display = "none";
        menu.style.display = "block";
        menu.style.position = "sticky"; 
        menu.style.height = "fit-content";
        // menu.style.marginTop = "4.5rem";
        // menu.style.marginBottom = "16rem"
        menu.style.paddingTop = "4.5rem"
        menu.style.paddingBottom = "13rem"
        menu.style.backgroundColor = "black";
        menu.style.width = "100%";
        menu.style.overflowY = "scroll";
        menu.style.top = "0rem";
        menu.scrollTop = 0;
        menu.scrollIntoView();

    }

    if (homeContainer.style.display == "flex") {
        homeContainer.style.display = "none";
    } else {
        if (aboutMeContainer.style.display == "none" &&
            contactMeContainer.style.display == "none" &&
            sectionTwoContainer.style.display == "none" &&
            firesafeContainer.style.display == "none" &&
            froggyJumperContainer.style.display == "none" &&
            spotifyPortfolioContainer.style.display == "none") {
                homeContainer.style.display = "flex";
                homeContainer.scrollIntoView();

            }
    };

}
