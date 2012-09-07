
/* filling the gap: translation URI to populationCategory *

function uri2PopCategory(uri) {
    var populationCategory ='';
    switch(uri)
    {
        case 'http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers':
            populationCategory = 'Refugees and asylum seekers';
            break;
        case 'http://hxl.humanitarianresponse.info/ns/#IDP':
            populationCategory = 'IDPs';
            break;
        case 'http://hxl.humanitarianresponse.info/ns/#Others':
            populationCategory = 'Others of concern';
            break;
        default:
            populationCategory = 'Displaced population';
    }
    return populationCategory;
}
*/

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var categoriesInfo = new Array();
categoriesInfo = getCategoriesInfo ();

var populationInfo;
getPopulationInfo ();


/*  Buttons over */
$(function () { 
    $("#infoPopover1").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
    $("#catPopover1").popover({placement:'left', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover2").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
    $("#catPopover2").popover({placement:'left', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover3").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
    $("#catPopover3").popover({placement:'left', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover4").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
    $("#catPopover4").popover({placement:'left', delay: {show: 300, hide: 100 }}); 
}); 
    
function initSparklinesCategories(categoriesData) {
    $(function() {
        
        // Display
        // Category and its popover
        $("#catPopover1").html(categoriesData.results.bindings[0]['classLabel'].value);
        $("#catPopover2").html(categoriesData.results.bindings[0]['subClassLabel'].value);
        $("#catPopover3").html(categoriesData.results.bindings[2]['subClassLabel'].value);
        $("#catPopover4").html(categoriesData.results.bindings[1]['subClassLabel'].value);

        var el = document.getElementById("catPopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[0]['classDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[0]['classLabel'].value
            }
        }

        var el = document.getElementById("catPopover2");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[0]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[0]['subClassLabel'].value
            }
        }

        var el = document.getElementById("catPopover3");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[2]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[2]['subClassLabel'].value
            }
        }

        var el = document.getElementById("catPopover4");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[1]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[1]['subClassLabel'].value
            }
        }
    });
}

var count1;
var count2;
var count3;
var count4;
var dateArray1;
var dateArray2;
var dateArray3;
var dateArray4;
function initSparklines() {
        
    // Fabricating the data
    var source1 = new Array();
    var source2 = new Array();
    var source3 = new Array();
    var source4 = new Array();
    var method1 = new Array();
    var method2 = new Array();
    var method3 = new Array();
    var method4 = new Array();
    var reportedBy1 = new Array();
    var reportedBy2 = new Array();
    var reportedBy3 = new Array();
    var reportedBy4 = new Array();
    var lastCount1 = 0;
    var lastCount2 = 0;
    var lastCount3 = 0;
    var lastCount4 = 0;
    var date1 = '';
    var date2 = '';
    var date3 = '';
    var date4 = '';

    count1 = new Array();
    count2 = new Array();
    count3 = new Array();
    count4 = new Array();
    dateArray1 = new Array();
    dateArray2 = new Array();
    dateArray3 = new Array();
    dateArray4 = new Array();

    // page title
    $("#overViewTitle").html($("#overViewTitle").html() + populationInfo.results.bindings[0]['countryDisplay'].value);

    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {

        // parsing by date
        if (currentDate != populationInfo.results.bindings[i]['date'].value) {
            currentDate = populationInfo.results.bindings[i]['date'].value;
            graphIndex++;
            count1[graphIndex] = 0;
            count2[graphIndex] = 0;
            count3[graphIndex] = 0;
            count4[graphIndex] = 0;
        }

        switch(populationInfo.results.bindings[i]['type'].value) 
        {
            case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                date2 = populationInfo.results.bindings[i]['date'].value;
                break;
            case "http://hxl.humanitarianresponse.info/ns/#IDP":
                date3 = populationInfo.results.bindings[i]['date'].value;
                break;
            case "http://hxl.humanitarianresponse.info/ns/#Others":
                date4 = populationInfo.results.bindings[i]['date'].value;
                break;
        }
            
        // Getting the main graph count and date, the main source, method and reported by
        count1[graphIndex] = parseInt(count1[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        dateArray1[graphIndex] = new Date(populationInfo.results.bindings[i]['date'].value);
        date1 = populationInfo.results.bindings[i]['date'].value;
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source1) < 0) {
            source1.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method1) < 0) {
            method1.push(populationInfo.results.bindings[i]['methodDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy1) < 0) {
            reportedBy1.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
        }

        // Getting the graph count, the source, the method and the reported by.
        switch(populationInfo.results.bindings[i]['type'].value) 
        {
            case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                count2[graphIndex] = parseInt(count2[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source2) < 0) {
                    source2.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method2) < 0) {
                    method2.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy2) < 0) {
                    reportedBy2.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
            case "http://hxl.humanitarianresponse.info/ns/#IDP":
                count3[graphIndex] = parseInt(count3[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source3) < 0) {
                    source3.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method3) < 0) {
                    method3.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy3) < 0) {
                    reportedBy3.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
            case "http://hxl.humanitarianresponse.info/ns/#Others":
                count4[graphIndex] = parseInt(count4[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source4) < 0) {
                    source4.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method4) < 0) {
                    method4.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy4) < 0) {
                    reportedBy4.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
        }

        // Getting the big last count
        lastCount1 = count1[graphIndex];
        lastCount2 = count2[graphIndex];
        lastCount3 = count3[graphIndex];
        lastCount4 = count4[graphIndex];

    } // end loop

    // Display
    // Big count
    $("#lastCount1").html(numberWithCommas(lastCount1));
    $("#lastCount2").html(numberWithCommas(lastCount2));
    $("#lastCount3").html(numberWithCommas(lastCount3));
    $("#lastCount4").html(numberWithCommas(lastCount4));

    // Date
    dsplit1 = date1.split("-");
    dsplit2 = date2.split("-");
    dsplit3 = date3.split("-");
    dsplit4 = date4.split("-");

    dateOk1 = new XDate(dsplit1[0], dsplit1[1], dsplit1[2]);
    dateOk2 = new XDate(dsplit2[0], dsplit2[1], dsplit2[2]);
    dateOk3 = new XDate(dsplit3[0], dsplit3[1], dsplit3[2]);
    dateOk4 = new XDate(dsplit4[0], dsplit4[1], dsplit4[2]);

    $("#date1").html(dateOk1.toString("dd MMM yyyy"));
    $("#date2").html(dateOk2.toString("dd MMM yyyy"));
    $("#date3").html(dateOk3.toString("dd MMM yyyy"));
    $("#date4").html(dateOk4.toString("dd MMM yyyy"));

    // Popups Info
    var infoPop1 = document.getElementById("infoPopover1");
    var pop1Full = '';
    pop1Full = 'Source:';
    for (var j = 0; j < source1.length; j++) {
        pop1Full += ' ' + source1[j];
    }
    pop1Full += '.<br />Method:';
    for (var j = 0; j < method1.length; j++) {
        pop1Full += ' ' + method1[j];
    }
    pop1Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy1.length; j++) {
        pop1Full += ' ' + reportedBy1[j];
    }
    pop1Full += '.';
    for (var i=0, attrs=infoPop1.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop1Full;
        }
    }

    var infoPop2 = document.getElementById("infoPopover2");
    var pop2Full = '';
    pop2Full = 'Source:';
    for (var j = 0; j < source2.length; j++) {
        pop2Full += ' ' + source2[j];
    }
    pop2Full += '.<br />Method:';
    for (var j = 0; j < method2.length; j++) {
        pop2Full += ' ' + method2[j];
    }
    pop2Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy2.length; j++) {
        pop2Full += ' ' + reportedBy2[j];
    }
    pop2Full += '.';
    for (var i=0, attrs=infoPop2.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop2Full;
        }
    }

    var infoPop3 = document.getElementById("infoPopover3");
    var pop3Full = '';
    pop3Full = 'RSource:';
    for (var j = 0; j < source3.length; j++) {
        pop3Full += ' ' + source3[j];
    }
    pop3Full += '.<br />Method:';
    for (var j = 0; j < method3.length; j++) {
        pop3Full += ' ' + method3[j];
    }
    pop3Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy3.length; j++) {
        pop3Full += ' ' + reportedBy3[j];
    }
    pop3Full += '.';
    for (var i=0, attrs=infoPop3.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop3Full;
        }
    }

    var infoPop4 = document.getElementById("infoPopover4");
    var pop4Full = '';
    pop4Full = 'Source:';
    for (var j = 0; j < source4.length; j++) {
        pop4Full += ' ' + source4[j];
    }
    pop4Full += '.<br />Method:';
    for (var j = 0; j < method4.length; j++) {
        pop4Full += ' ' + method4[j];
    }
    pop4Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy4.length; j++) {
        pop4Full += ' ' + reportedBy4[j];
    }
    pop4Full += '.';
    for (var i=0, attrs=infoPop4.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop4Full;
        }
    }

    // Instanciation
    $("#sparkline1").sparkline(count1, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline2").sparkline(count2, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline3").sparkline(count3, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline4").sparkline(count4, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});
}