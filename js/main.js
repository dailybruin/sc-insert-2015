// https://docs.google.com/spreadsheets/d/1aD9FjfUtjfYak76rvaVpyhkpLBV2IWYBMEIX15WMn7o/edit#gid=0
var sheetID = "1aD9FjfUtjfYak76rvaVpyhkpLBV2IWYBMEIX15WMn7o";

// Handlebars variables
var body_template_html = $("#body-template").html();
//var body_template = Handlebars.compile(body_template_html);


Handlebars.registerHelper("formatBodyText", function(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    return (t.length>0?'<p>'+t.replace(re,'</p><p>')+'</p>':null);
});



$(document).ready(function() {


	var masterurl = "https://spreadsheets.google.com/feeds/list/" + sheetID + "/default/public/values?alt=json";
	$.getJSON(masterurl, function(data) {
		data = clean_google_sheet_json(data);
		console.log(data);

		// $.each(data, function(key, obj) {

		// });


		
	});




})




function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}



var Page = (function() {
	var config = {
			$bookBlock : $( '#bb-bookblock' ),
			$navNext : $( '#bb-nav-next' ),
			$navPrev : $( '#bb-nav-prev' ),
			$navFirst : $( '#bb-nav-first' ),
			$navLast : $( '#bb-nav-last' )
		},
		init = function() {
			config.$bookBlock.bookblock( {
				speed : 1000,
				shadowSides : 0.8,
				shadowFlip : 0.4
			} );
			initEvents();
		},
		initEvents = function() {
			
			var $slides = config.$bookBlock.children();

			// add navigation events
			config.$navNext.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'next' );
				return false;
			} );

			config.$navPrev.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'prev' );
				return false;
			} );

			config.$navFirst.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'first' );
				return false;
			} );

			config.$navLast.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'last' );
				return false;
			} );
			
			// add swipe events
			$slides.on( {
				'swipeleft' : function( event ) {
					config.$bookBlock.bookblock( 'next' );
					return false;
				},
				'swiperight' : function( event ) {
					config.$bookBlock.bookblock( 'prev' );
					return false;
				}
			} );

			// add keyboard events
			$( document ).keydown( function(e) {
				var keyCode = e.keyCode || e.which,
					arrow = {
						left : 37,
						up : 38,
						right : 39,
						down : 40
					};

				switch (keyCode) {
					case arrow.left:
						config.$bookBlock.bookblock( 'prev' );
						break;
					case arrow.right:
						config.$bookBlock.bookblock( 'next' );
						break;
				}
			} );
		};

		return { init : init };

})();

Page.init();