

//var country = "Deou";
var geocoder;



/* Google map example */
var map;

function initializeMap() {

var myLatlng = new google.maps.LatLng(1.757434,15.2954399);


    var mapOptions = {
      center: new google.maps.LatLng(1.557625,15.2817),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    

geocoder = new google.maps.Geocoder();

//console.log("smallestGeoZone: " + smallestGeoZone);
    geocoder.geocode( {'address' : smallestGeoZone}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
    }

var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);

});

}

/*  */
function loadData() { 
  updateData();
}


var catChoice;
var locChoice;
var sexChoice;
var ageChoice;
var originChoice;
var sourceChoice;
function InitLabels(buttonId) { 
    catChoice = 0;
    locChoice = 1; 
    sexChoice = 0; 
    ageChoice = 0; 
    originChoice = 0; 
    sourceChoice = 0; 
    // Display
    // page title
   // var popCategory = '';
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');
    switch(buttonId)
    {
        case 'NextButton1':
            catChoice = 0;
            break;
        case 'NextButton2':
            catChoice = 1;
            break;
        case 'NextButton3':
            catChoice = 2;
            break;
        case 'NextButton4':
            catChoice = 3;
            break;
    }
    $('#catForm').empty();
    for (var i = 0; i < categoriesLabels.length; i++) {
        $('#catForm').append('<option value="' + categoriesLabels[i] + '">' + categoriesLabels[i] + '</option>');
    }
    document.catForm.populations.options.selectedIndex = catChoice;

    // Memorize selections
    if (document.locForm.locations != undefined)
    {
        locChoice = document.locForm.locations.options.selectedIndex;
    }
    if (document.sexForm.sex != undefined)
    {
        sexChoice = document.sexForm.sex.options.selectedIndex;
    }
    if (document.ageForm.age != undefined)
    {
        ageChoice = document.ageForm.age.options.selectedIndex;
    }
    if (document.originForm.origin != undefined)
    {
        originChoice = document.originForm.origin.options.selectedIndex;
    }
    if (document.sourceForm.source != undefined)
    {
        sourceChoice = document.sourceForm.source.options.selectedIndex;
    }

    // Fill dd lists from the query.
    var tempArray = new Array();
    $('#locForm').empty();
    $('#locForm').append('<option value="all_locations">* All locations</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['countryDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['countryPCode'].value + '">' + populationInfo.results.bindings[i]['countryDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['countryDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['regionDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['regionDisplay'].value + '">' + populationInfo.results.bindings[i]['regionDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['regionDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['provinceDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['provinceDisplay'].value + '">' + populationInfo.results.bindings[i]['provinceDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['provinceDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['departementDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['departementDisplay'].value + '">' + populationInfo.results.bindings[i]['departementDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['departementDisplay'].value);
        }
    }
    $('#locForm')[0].selectedIndex = locChoice;
    if ($('#locForm')[0].selectedIndex != 0) {
        smallestGeoZone = $('select#locForm').val();
    } else {
        smallestGeoZone = biggestGeoZone;
    }

    var tempArray = new Array();
    $('#sexForm').empty();
    $('#sexForm').append('<option value="all_sex">* All sex categories</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sexDisplay'].value, tempArray) < 0) {

            $('#sexForm').append('<option value="' + populationInfo.results.bindings[i]['sexDisplay'].value + '">' + populationInfo.results.bindings[i]['sexDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['sexDisplay'].value);
        }
    }
    $('#sexForm')[0].selectedIndex = sexChoice;

    var tempArray = new Array();
    $('#ageForm').empty();
    $('#ageForm').append('<option value="all_ages">* All age categories</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['ageDisplay'].value, tempArray) < 0) {

            $('#ageForm').append('<option value="' + populationInfo.results.bindings[i]['ageDisplay'].value + '">' + populationInfo.results.bindings[i]['ageDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['ageDisplay'].value);
        }
    }
    $('#ageForm')[0].selectedIndex = ageChoice;


    var tempArray = new Array();
    $('#originForm').empty();
    $('#originForm').append('<option value="all_countries">* All countries</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['nationalityDisplay'].value, tempArray) < 0) {

            $('#originForm').append('<option value="' + populationInfo.results.bindings[i]['nationalityPCode'].value + '">' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['nationalityDisplay'].value);
        }
    }
    $('#originForm')[0].selectedIndex = originChoice;



    var tempArray = new Array();
    $('#sourceForm').empty();
    $('#sourceForm').append('<option value="all_sources">* All sources</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, tempArray) < 0) {

            $('#sourceForm').append('<option value="' + populationInfo.results.bindings[i]['sourceDisplay'].value + '">' + populationInfo.results.bindings[i]['sourceDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
    }
    $('#sourceForm')[0].selectedIndex = sourceChoice;



}


function refresh() { 
    InitLabels("NextButton" + ((document.catForm.populations.options.selectedIndex * 1) + 1));
    drawChart(document.catForm.populations.options.selectedIndex); 
    initializeMap();
}


/* Detailed graph */
google.load('visualization', '1', {'packages':['annotatedtimeline']});

// its timely display
function drawChart(catChoiceLocal) {

    var count = new Array();
    var dateArray = new Array();

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'IDPs (fake)');
    data.addColumn('string', 'title1');
    data.addColumn('string', 'text1');

    // Data preparation
    var personCountDtl = 0;
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // filters        
        if ($('select#catForm').val() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('select#catForm').val()){
        if (locChoice == 0  ||
            populationInfo.results.bindings[i]['countryPCode'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['departementDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('select#locForm').val()){
        if (sexChoice == 0  ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('select#sexForm').val()){
        if (ageChoice == 0  ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('select#ageForm').val()){
        if (originChoice == 0  ||
            populationInfo.results.bindings[i]['nationalityPCode'].value == $('select#originForm').val()){
        if (sourceChoice == 0  ||
            populationInfo.results.bindings[i]['sourceDisplay'].value == $('select#sourceForm').val()){

            // parsing by date
            if (currentDate != populationInfo.results.bindings[i]['date'].value) {
                currentDate = populationInfo.results.bindings[i]['date'].value;
                graphIndex++;
                count[graphIndex] = 0;
                newDate = new Date();
                switch(catChoiceLocal)
                {
                    case 0:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 1:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 2:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 3:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    default:
                }
                dateArray[graphIndex] = newDate;
            }
            count[graphIndex] = parseInt(count[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);

        // end filters
        }
        }
        }
        }
        }
    }


    for (var i = 0; i < count.length; i++) {


        tempArray.push(new Array(dateArray[i], count[i] * 1, undefined, undefined));

    }
    data.addRows(tempArray); 

/*
    // Drawing
   // data.addRows([
      [new Date(2011, 11 ,1), 2000, undefined, undefined], // add 3 column parameters for another line on the graph
      [new Date(2011, 12 ,10), 4045, undefined, undefined],
      [new Date(2012, 1 ,20), 5022, undefined, undefined],
      [new Date(2012, 2 ,25), 5284, undefined, undefined],
      [new Date(2012, 3 ,1), 4045, undefined, undefined],
      [new Date(2012, 4 ,25), 5022, undefined, undefined],
      [new Date(2012, 5 ,10), 5284, undefined, undefined],
      [new Date(2012, 6 ,25), 3476, undefined, undefined],       
      //new Date(2012, 4 ,1), 3476, 'Conflict easing','At ceasefire a first wave of people leave the camp'],

      [new Date(2012, 5 ,1), 3322, undefined, undefined]
    ]);*/

    var options = {
      title : 'IDPs count in Burkina Faso Deou 2011 2012',
      vAxis: {title: "persons"},
      hAxis: {title: "Time"}
    };

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
    chart.draw(data, options);
}
