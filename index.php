<!DOCTYPE html>
<html lang="en">
<head>
	<title>HXL Dashboard</title>
	<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <link href="css/hxlator.css" rel="stylesheet"> 
    <link rel="shortcut icon" href="img/favicon.ico">
    
    <STYLE type="text/css">
        /* THIS IS THE ACTUAL DISPLAY AREA OF THE SLIDERS */
        #container
        {
            width: 900px;
            overflow: hidden;
        }

        /* SET TO THE TOTAL WIDTH OF ALL DIVS */
        #slider-wrapper
        {
            width: 2700px;
        }

        /* THESE ARE THE INDIVIDUAL SLIDE PROPERTIES */
        .slide
        {
            width: 900px;
            overflow: hidden;
            float: left;
        }
       
        /**/
        .center {
            width: 100%;
            text-align: center;
        }

    </STYLE>
    
    <!--[if lt IE 9]>
      <script src="js/html5.js"></script>
    <![endif]-->
        
    <script src="js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/slide-fade-content.js"></script>
    <script type="text/javascript" src="js/jquery.sparkline.min.js"></script>

    <script src="js/json2.js"></script> 

    <script src="sparqlQueries.js"></script>  
    
    <!-- For popovers -->
    <script src="js/bootstrap-tooltip.js"></script>  
    <script src="js/bootstrap-popover.js"></script> 

    <script type='text/javascript' src='js/google-jsapi.js'></script>
    
    <!-- Google map example -->
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCO1uRxzM-IsW4NKTssQHKJo8kVxP1Nw8k&sensor=false"></script>
    
    <!-- Sliding panels -->
    <script type='text/javascript' src='js/panelsManagement.js'></script>
    
    <!-- Sparklines -->
    <script type='text/javascript' src='js/loadSimpleView.js'></script>

    <script type='text/javascript' src='js/xdate.js'></script>
    
    <script type="text/javascript">
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


        var categoriesInfo = new Array();
        categoriesInfo = getCategoriesInfo ();

        var populationInfo;
        getPopulationInfo ();

        initSparklinesCategories(categoriesInfo);  
        initSparklines();  
    </script>                    

    <!-- Country choice -->
    <script type="text/javascript">
        /*******************************************
         * UPDATEDATA
         *******************************************/
        function updateData(newCountryUri)
        {
            if (newCountryUri != null) {

                $.ajax({
                    url:     'ajaxUpdater.php?countryUri=' + newCountryUri,
                    async:   false,
                    success: function(result) {
                        var tmp = document.createElement('div'); 
                        tmp.innerHTML = result;
                        var tagAfter = document.getElementById('slide1');
                        tagAfter.parentNode.insertBefore(tmp, tagAfter);
                        if(result.isOk == false)
                            alert(result.message);
                        }
                    });    
                }

                // cleaning
                var div = document.getElementById("currentCountryUri");
                div.parentNode.removeChild(div);
                var div = document.getElementById("currentPopulation");
                div.parentNode.removeChild(div);
        }
    </script>
    
    <!--  Buttons over -->
    <script type="text/javascript">
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
    </script>
    
    <!-- Detailed graph -->
    <script type='text/javascript'>
      google.load('visualization', '1', {'packages':['annotatedtimeline']});
      
      // its timely display
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'IDPs (fake)');
        data.addColumn('string', 'title1');
        data.addColumn('string', 'text1');
        data.addRows([
          [new Date(2011, 11 ,1), 3000, undefined, undefined], // add 3 column parameters for another line on the graph
          [new Date(2011, 12 ,10), 4045, undefined, undefined],
          [new Date(2012, 1 ,20), 5022, undefined, undefined],
          [new Date(2012, 2 ,25), 5284, undefined, undefined],
          [new Date(2012, 3 ,1), 4045, undefined, undefined],
          [new Date(2012, 4 ,25), 5022, undefined, undefined],
          [new Date(2012, 5 ,10), 5284, undefined, undefined],
          [new Date(2012, 6 ,25), 3476, undefined, undefined],       
          /*[new Date(2012, 4 ,1), 3476, 'Conflict easing','At ceasefire a first wave of people leave the camp'],*/

          [new Date(2012, 5 ,1), 3322, undefined, undefined]
        ]);

        var options = {
          title : 'IDPs count in Burkina Faso Deou 2011 2012',
          vAxis: {title: "persons"},
          hAxis: {title: "Time"}
        };

        var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
        chart.draw(data, options);
      }
    </script>
    
    <!-- Google map example -->
    <script type="text/javascript">
    var map;

      function initializeMap() {
        var mapOptions = {
          center: new google.maps.LatLng(41.716667,44.783333),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      }

    </script>
    
    <script type="text/javascript">
      // 
      function loadData() { 
          updateData();
      }
      
    </script>
    
</head>
        
<body>

    <div class="navbar container">
        <div class="container">
            <span class="brand"><img src="img/logo.png" /></span>
            <div class="nav-hxlator">
                <ul class="nav" id="topnav">

                <li class="active"><a href="index.php">HXL Dashboard</a></li>
                <li><a href="#">Other menu item</a></li>
                </ul>
            </div>
        </div>
    </div>    

    <div class="container" style="text-align: left;">
        <a href="https://sites.google.com/site/hxlproject/"><img src="img/hxl-logo-s.png" align="right" /></a><br />
            <h2>HXL Dashboard</h2>
        
     	<br />
        <br />
        <!-- DISPLAY CONTAINER -->
        <div style="position: relative" >
            <div style="width: 900px; padding: 0 auto; margin: 0 auto;" >
                <div id="container" class="hero-unit" style="width: 900px; padding: 0; margin: 0;" >
                    <div id="slider-wrapper">
                        <?php 
                            include('slider1.php');
                        ?>
                        <?php 
                            include('slider2.php');
                        ?>
                        <?php 
                            include('slider3.php');
                        ?>
                    </div>
                </div>
            </div>
                <br />
            <p id="footer" style="text-align: center;" >
                <a href="http://hxl.humanitarianresponse.info/">Powered by HXL</a> &copy; 2012 UNOCHA
            </p> 
        </div>
        <div style="clear: both;" ></div>
        <div class="container footer">
    		<div class="row">
                <div class="span3"><strong>Contact</strong><br />
            		This site is part of the HumanitarianResponse network. Write to 
         	         <a href="mailto:info@humanitarianresponse.info">info@humanitarianresponse.info</a> for more information.
                </div>
                <div class="span3"><strong>Links</strong><br />
                    <a href="https://sites.google.com/site/hxlproject/">HXL Project</a><br />
                    <a href="http://hxl.humanitarianresponse.info/">HXL Standard</a>
                </div>
    		    <div class="span3"><strong>Follow HXL</strong><br />
    		        <span class="label label-warning">TBD</span>
                </div>
    		    <div class="span3"><strong>Legal</strong><br />
    		      &copy; 2012 UNOCHA
                </div>
    		</div>
	   </div>
    </div>
</body>
</html>
