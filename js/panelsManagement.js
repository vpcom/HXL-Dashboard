
// Loading the slider
window.onload = bindButtonsEvents; 

var SlideWidth = 900;
var SlideSpeed = 900;

/* Slide 1 */
$(document).ready(function () {
    $("#slideContainer1").show('slow');
    $("#slideContainer2").hide('slow');
    $("#slideContainer3").hide('slow');

    initTitle();  
    initSparklinesCategories(categoriesInfo);  
    initSparklines();  
});

/* get current margin of slider */
function CurrentMargin() {
    var currentMargin = $("#slider-wrapper").css("margin-left");

    // first page load, margin will be auto, we need to change this to 0
    if (currentMargin == "auto") {
        currentMargin = 0;
    }

    // return the current margin to the function as an integer
    return parseInt(currentMargin);
}

function NextSlide(eventId) {
    InitLabels(eventId);

    unBindButtonsEvents();
   
    var newMargin = CurrentMargin() - SlideWidth;
    $("#slideContainer2").show('slow');
    
    // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () {
        bindButtonsEvents();
    });

    drawChart(catChoice); 
    initializeMap();
}

function LastSlide() {
    unBindButtonsEvents();
   
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() - SlideWidth;
    $("#slideContainer3").show('slow');
    
    // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () {
        bindButtonsEvents();
    });

    LoadTableView();
}

function PrintTime() {
    var currentDate = new Date()
    var minutes = currentDate.getMinutes();
    var secondes = currentDate.getSeconds();
    return minutes + ":" + secondes;
}

function PreviousSlide(event) {
    unBindButtonsEvents();

    switch(event.id)
    {
        case 'PreviousButton':
            $("#slideContainer2").hide('slow');
            break;
        case 'PreviousButton2':
            $("#slideContainer3").hide('slow');
            break;
    }
    
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() + SlideWidth;

    // slide the wrapper to the right to show the previous panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () { bindButtonsEvents(); });
}

function bindButtonsEvents() {
    var btnNext1 = document.getElementById("NextButton1");
    var btnNext2 = document.getElementById("NextButton2");
    var btnNext3 = document.getElementById("NextButton3");
    var btnNext4 = document.getElementById("NextButton4");
    var btnTableView1 = document.getElementById("goToTableView1");
    var btnTableView2 = document.getElementById("goToTableView2");
    var btnPrevious1 = document.getElementById("PreviousButton1");
    var btnPrevious2 = document.getElementById("PreviousButton2");
    
    $(btnNext1).bind('click', function(){NextSlide(this.id); InitLabels(this.id)});
    $(btnNext2).bind('click', function(){NextSlide(this.id); InitLabels(this.id)});
    $(btnNext3).bind('click', function(){NextSlide(this.id); InitLabels(this.id)});
    $(btnNext4).bind('click', function(){NextSlide(this.id); InitLabels(this.id)});
    $(btnTableView1).bind('click', function(){LastSlide(this);});
    $(btnTableView2).bind('click', function(){LastSlide(this);});
    $(btnPrevious1).bind('click', function(){PreviousSlide(this);});
    $(btnPrevious2).bind('click', function(){PreviousSlide(this);});
} 

function unBindButtonsEvents() {
    var btnNext1 = document.getElementById("NextButton1");
    var btnNext2 = document.getElementById("NextButton2");
    var btnNext3 = document.getElementById("NextButton3");
    var btnNext4 = document.getElementById("NextButton4");
    var btnTableView1 = document.getElementById("goToTableView1");
    var btnTableView2 = document.getElementById("goToTableView2");
    var btnPrevious1 = document.getElementById("PreviousButton1");
    var btnPrevious2 = document.getElementById("PreviousButton2");
    
    $(btnNext1).unbind('click');
    $(btnNext2).unbind('click');
    $(btnNext3).unbind('click');
    $(btnNext4).unbind('click');
    $(btnTableView1).unbind('click');
    $(btnTableView2).unbind('click');
    $(btnPrevious1).unbind('click', function(){PreviousSlide(this);});
    $(btnPrevious2).unbind('click', function(){PreviousSlide(this);});
} 
