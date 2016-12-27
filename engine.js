/**
 * Created by Mukena on 10/19/2016.
 */

var invert = {1:2, 2:1};
today = new Date;
var jd = gregorian_to_jd(today.getFullYear(), today.getMonth(), today.getDay());

function romanize (num) {
    //Source: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    //num = Math.abs(nume);
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    if (digits[0]=="-"){
        digits = digits.slice(1);
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return "-"+Array(+digits.join("") + 1).join("M") + roman;
    }else{
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
}

function deromanize (string) {
    //Source: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    var neg = false;
    if (string.charAt(0)=="-"){
        neg = true;
        str = string.substring(1);
    }else{
        str = string;
    }
    var	str = str.toUpperCase(),
        validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        num = 0, m;
    if (!(str && validator.test(str)))
        return false;
    while (m = token.exec(str))
        num += key[m[0]];
    if (neg){
        return -num;
    }
    return num;
}


var Engine = function (i) { // Engine that will manage the values of the form
    // and oversee conversion.
    this.num = i; // 1 or 2, according to thr number of the form
    this.calendar = $("#calendar-type-"+this.num).val();
    $(".days"+this.num).hide(); //Hide all the days
    $(".months"+this.num).hide(); //Hide all the months
    $(".years"+this.num).hide(); //Hide all the years
    switch(this.calendar) {
        case "Gregorian_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.gregorianMonth = parseInt($("#gregorian-month-"+this.num).val());
            $("#gregorian-month-"+this.num).show();
            this.gregorianYear = parseInt($("#year-digits-"+this.num).val());
            $("#year-digits-"+this.num).show();
            console.log("Gregorian Calendar!");
            break;
        case "French_Republican_Calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.décade = parseInt($("#décade-"+this.num).val());
            $("#décade-"+this.num).show();
            this.frenchRevolutionMonth = parseInt($("#french-month-"+this.num).val());
            $("#french-month-"+this.num).show();
            this.frenchRevolutionYear = parseInt(deromanize($("#year-french-revolution-"+this.num).val()));
            $("#year-french-revolution-"+this.num).show();
            break;
        case "Hebrew_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.hebrewMonth = parseInt($("#hebrew-month-"+this.num).val());
            $("#hebrew-month-"+this.num).show();
            this.hebrewYear = parseInt($("#hebrew-year-"+this.num).val());
            $("#hebrew-year-"+this.num).show();
            break;
        case "Islamic_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.islamicMonth = parseInt($("#islamic-month-"+this.num).val());
            $("#islamic-month-"+this.num).show();
            this.islamicYear = parseInt($("#islamic-year-"+this.num).val());
            $("#islamic-year-"+this.num).show();
            break;
    }
};

Engine.prototype.submitDate = function() {// Submit and compute Julian day
    switch(this.calendar) {
        case "Gregorian_calendar":
            jd = gregorian_to_jd(this.gregorianYear, this.gregorianMonth, this.day);
            console.log("JD when "+this.num+" submitted: "+ jd);
            break;
        case "French_Republican_Calendar":
            jd = french_revolutionary_to_jd(this.frenchRevolutionYear, this.frenchRevolutionMonth, this.décade, this.day);
            console.log("JD when "+this.num+" submitted: "+ jd);
            break;
        case "Hebrew_calendar":
            jd = hebrew_to_jd(this.hebrewYear,this.hebrewMonth, this.day);
            console.log("JD when "+this.num+" submitted: "+ jd);
            break;
        case "Islamic_calendar":
            jd = islamic_to_jd(this.islamicYear,this.islamicMonth, this.day);
            console.log("JD when "+this.num+" submitted: "+ jd);
            break;
    }
};

Engine.prototype.updateEngine = function() {// Update the engine with the current values.
    this.calendar = $("#calendar-type-"+this.num).val();
    $(".days"+this.num).hide(); //Hide all the days
    $(".months"+this.num).hide(); //Hide all the months
    $(".years"+this.num).hide(); //Hide all the years
    switch(this.calendar) {
        case "Gregorian_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.gregorianMonth = parseInt($("#gregorian-month-"+this.num).val());
            $("#gregorian-month-"+this.num).show();
            this.gregorianYear = parseInt($("#year-digits-"+this.num).val());
            $("#year-digits-"+this.num).show();
            console.log("Gregorian Calendar!");
            break;
        case "French_Republican_Calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.décade = parseInt($("#décade-"+this.num).val());
            $("#décade-"+this.num).show();
            this.frenchRevolutionMonth = parseInt($("#french-month-"+this.num).val());
            $("#french-month-"+this.num).show();
            this.frenchRevolutionYear = parseInt(deromanize($("#year-french-revolution-"+this.num).val()));
            $("#year-french-revolution-"+this.num).show();
            break;
        case "Hebrew_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.hebrewMonth = parseInt($("#hebrew-month-"+this.num).val());
            $("#hebrew-month-"+this.num).show();
            this.hebrewYear = parseInt($("#hebrew-year-"+this.num).val());
            $("#hebrew-year-"+this.num).show();
            break;
        case "Islamic_calendar":
            this.day = parseInt($("#day-"+this.num).val());
            $("#day-"+this.num).show();
            this.islamicMonth = parseInt($("#islamic-month-"+this.num).val());
            $("#islamic-month-"+this.num).show();
            this.islamicYear = parseInt($("#islamic-year-"+this.num).val());
            $("#islamic-year-"+this.num).show();
            break;
    }
};

Engine.prototype.researchDate = function() {// Convert from Julian day
    switch(this.calendar) {
        case "Gregorian_calendar":
            research_month(gregorianMonths[this.gregorianMonth]);
            research_calendar(this.calendar);
            break;
        case "French_Republican_Calendar":
            research_month(frenchRepublicanMonths[this.frenchRevolutionMonth]);
            research_calendar(this.calendar);
            break;
        case "Hebrew_calendar":
            research_month(hebrewMonths[this.hebrewMonth]);
            research_calendar(this.calendar);
            break;
        case "Islamic_calendar":
            research_month(islamicMonths[this.islamicMonth]);
            research_calendar(this.calendar);
            break;
    }
};

Engine.prototype.convertDate = function() {// Convert from Julian day
    switch(this.calendar) {
        case "Gregorian_calendar":
            console.log("JD before "+this.num+" converted: "+ jd);
            date = jd_to_gregorian(jd);
            console.log(date);
            $("#year-digits-"+this.num).val(date[0]);
            $("#gregorian-month-"+this.num).val(date[1]);
            $("#day-"+this.num).val(date[2]);
            this.updateEngine(); // Update the engine
            this.researchDate(); // Research the converted date
            break;
        case "French_Republican_Calendar":
            console.log("JD before "+this.num+" converted: "+ jd);
            date = jd_to_french_revolutionary(jd);
            console.log(date);
            $("#year-french-revolution-"+this.num).val(romanize(date[0]));
            $("#french-month-"+this.num).val(date[1]);
            $("#décade-"+this.num).val(date[2]);
            $("#day-"+this.num).val(date[3]);
            this.updateEngine(); // Update the engine
            this.researchDate(); // Research the converted date
            break;
        case "Hebrew_calendar":
            console.log("JD before "+this.num+" converted: "+ jd);
            date = jd_to_hebrew(jd);
            console.log(date);
            $("#hebrew-year-"+this.num).val(date[0]);
            $("#hebrew-month-"+this.num).val(date[1]);
            $("#day-"+this.num).val(date[2]);
            this.updateEngine(); // Update the engine
            this.researchDate(); // Research the converted date
            break;
        case "Islamic_calendar":
            console.log("JD before "+this.num+" converted: "+ jd);
            date = jd_to_islamic(jd);
            console.log(date);
            $("#islamic-year-"+this.num).val(date[0]);
            $("#islamic-month-"+this.num).val(date[1]);
            $("#day-"+this.num).val(date[2]);
            this.updateEngine(); // Update the engine
            this.researchDate(); // Research the converted date
            break;
    }
};