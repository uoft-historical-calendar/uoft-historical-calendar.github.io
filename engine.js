/**
 * Created by Mukena on 10/19/2016.
 */
var invert = {1:2, 2:1};
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

// Functions that allow communication between the state and the forms.
function populate_calendar(calendar_name, num){
    current_calendar = calendars[calendar_name][num];
    for (var keyword in current_calendar){
        current_calendar[keyword] = parseInt($("#"+keyword).val());
        $("#"+keyword).show();
    }
}
function convert_to_jd(calendar_name, num){
    current_calendar = calendars[calendar_name];
    return current_calendar["change-to-jd"](num);
}
function convert_from_jd(calendar_name, num, jd){
    current_calendar = calendars[calendar_name];
    current_calendar["change-from-jd"](jd, num);
}
function populate_form(calendar_name, num){
    current_calendar = calendars[calendar_name][num];
    for (var keyword in current_calendar){
        $("#"+keyword).val(current_calendar[keyword]);
        $("#"+keyword).show();
    }
}
/** Need to work on the research!!!!! */
function research(calendar_name, num){
    current_calendar = calendars[calendar_name];
    calendar_months = calendars[calendar_name]["months"];
    research_month(current_calendar["current_month_name"](num));
    research_calendar(calendar_name);
}

// The engine that handles the change of state of both the forms and the calendars.
var Engine = function (i) { // Engine that will manage the values of the form
    // and oversee conversion.
    this.num = i; // 1 or 2, according to the number of the form
    this.calendar = $("#calendar-type-"+this.num).val();
    $(".days"+this.num).hide(); //Hide all the days
    $(".months"+this.num).hide(); //Hide all the months
    $(".years"+this.num).hide(); //Hide all the years
    populate_calendar(this.calendar, this.num);
};
Engine.prototype.submitDate = function() {// Submit and compute Julian day
    jd = convert_to_jd(this.calendar, this.num);
};
Engine.prototype.updateEngine = function() {// Update the dictionary with the current values.
    this.calendar = $("#calendar-type-"+this.num).val();
    $(".days"+this.num).hide(); //Hide all the days
    $(".months"+this.num).hide(); //Hide all the months
    $(".years"+this.num).hide(); //Hide all the years
    convert_from_jd(this.calendar, this.num, jd);
    populate_calendar(this.calendar, this.num);
};
Engine.prototype.researchDate = function() {// Convert from Julian day
    research(this.calendar, this.num);
};
Engine.prototype.convertDate = function() {// Convert from Julian day
    console.log("JD before "+this.num+" converted: "+ jd);
    convert_from_jd(this.calendar,this.num,jd);
    populate_form(this.calendar, this.num);
    this.researchDate();
};