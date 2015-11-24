// https://docs.google.com/spreadsheets/d/1aD9FjfUtjfYak76rvaVpyhkpLBV2IWYBMEIX15WMn7o/edit#gid=0
var sheetID = "1XdNtwjMTO_tAaVRVr8UH-SL_qovIv9DYBGFRl5IyqnY";

// Handlebars variables
var body_template_html = $("#body-template").html();
var body_template = Handlebars.compile(body_template_html);


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

		$.each(data, function(key, obj) {

		});

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
