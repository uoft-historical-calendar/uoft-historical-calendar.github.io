/**
 * Created by Mukena on 10/31/2016.
 * Functions that query WIkipedia for calendar information
 */
function research_calendar(calendar){
    var infoCalendar = {title: null , text: null};
    urlCalendar = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=" +
        "&explaintext=&titles="+calendar+"&callback=?";
    $.getJSON( urlCalendar, function( data ) {
        key = Object.keys(data.query.pages)[0];
        title = data.query.pages[key].title;
        extract = data.query.pages[key].extract;
        titleString = title;
        detailString = extract;
        $("#calendar_name").html(titleString);
        $("#calendar_extract").html(detailString);
        $("#calendar_link").attr("href", "https://en.wikipedia.org/wiki/"+calendar);
    }).done(function( data ) {
        console.log("Calendar lookup succeeded.");
    }).fail(function(){
        console.log('Calendar lookup failed.');
    });
}

function research_month(month){
    var infoMonth = {title: null, text: null};
    urlMonth = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=" +
        "&explaintext=&titles="+month+"&callback=?";
    $.getJSON( urlMonth, function( data ) {
        key = Object.keys(data.query.pages)[0];
        title = data.query.pages[key].title;
        extract = data.query.pages[key].extract;
        titleString = title;
        monthString = extract;
        $("#month-name").html(titleString);
        $("#month-extract").html(monthString);
        $("#month_link").attr("href", "https://en.wikipedia.org/wiki/"+month);
    }).done(function( data ) {
        console.log("Month lookup succeeded.")
    }).fail(function(){
        console.log('Month lookup failed.');
    });

}