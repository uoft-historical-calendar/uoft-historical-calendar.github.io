var calendars = {
    "Gregorian_calendar":{
        1:{"day-1":1, "gregorian-month-1":1, "year-digits-1":2017},
        2:{"day-2":1, "gregorian-month-2":1, "year-digits-2":2017},
        "change-to-jd":function(num){
            return gregorian_to_jd(
                calendars.Gregorian_calendar[num]["year-digits-"+num],
                calendars.Gregorian_calendar[num]["gregorian-month-"+num],
                calendars.Gregorian_calendar[num]["day-"+num]
            );
        },
        "change-from-jd":function(arg1, num){
            date = jd_to_gregorian(arg1);
            calendars.Gregorian_calendar[num]["year-digits-"+num]=date[0];
            calendars.Gregorian_calendar[num]["gregorian-month-"+num]=date[1];
            calendars.Gregorian_calendar[num]["day-"+num]=date[2];
        },
        "current_month_name":function(num){
            return gregorianMonths[calendars.Gregorian_calendar[num]["gregorian-month-"+num]];
        }
    },
    "French_Republican_Calendar":{
        1:{"day-1":1, "french-month-1":1, "décade-1":1,"year-digits-1":300},
        2:{"day-2":1, "french-month-2":1, "décade-2":1,"year-digits-2":300},
        "change-to-jd":function(num){
            return french_revolutionary_to_jd(
                calendars.French_Republican_Calendar[num]["year-digits-"+num],
                calendars.French_Republican_Calendar[num]["french-month-"+num],
                calendars.French_Republican_Calendar[num]["décade-"+num],
                calendars.French_Republican_Calendar[num]["day-"+num]
            );
        },
        "change-from-jd":function(arg1, num){
            date = jd_to_french_revolutionary(arg1);
            calendars.French_Republican_Calendar[num]["year-digits-"+num]=date[0];
            calendars.French_Republican_Calendar[num]["french-month-"+num]=date[1];
            calendars.French_Republican_Calendar[num]["décade-"+num]=date[2];
            calendars.French_Republican_Calendar[num]["day-"+num]=date[3];
        },
        "current_month_name":function(num){
            return frenchRepublicanMonths[calendars.French_Republican_Calendar[num]["french-month-"+num]];
        }
    },
    "Hebrew_calendar":{
        1:{"day-1":1, "hebrew-month-1":1,"hebrew-year-1":5016},
        2:{"day-2":1, "hebrew-month-2":1,"hebrew-year-2":5016},
        "change-to-jd":function(num){
            return hebrew_to_jd(
                calendars.Hebrew_calendar[num]["hebrew-year-"+num],
                calendars.Hebrew_calendar[num]["hebrew-month-"+num],
                calendars.Hebrew_calendar[num]["day-"+num]
            );
        },
        "change-from-jd":function(arg1, num){
            date = jd_to_hebrew(arg1);
            calendars.Hebrew_calendar[num]["hebrew-year-"+num]=date[0];
            calendars.Hebrew_calendar[num]["hebrew-month-"+num]=date[1];
            calendars.Hebrew_calendar[num]["day-"+num]=date[2];
        },
        "current_month_name":function(num){
            return hebrewMonths[calendars.Hebrew_calendar[num]["hebrew-month-"+num]];
        }
    },
    "Islamic_calendar":{
        1:{"day-1":1, "islamic-month-1":1,"islamic-year-1":1400},
        2:{"day-2":1, "islamic-month-2":1,"islamic-year-2":1400},
        "change-to-jd":function(num){
            return islamic_to_jd(
                calendars.Islamic_calendar[num]["islamic-year-"+num],
                calendars.Islamic_calendar[num]["islamic-month-"+num],
                calendars.Islamic_calendar[num]["day-"+num]
            );
        },
        "change-from-jd":function(arg1, num){
            date = jd_to_islamic(arg1);
            calendars.Islamic_calendar[num]["islamic-year-"+num]=date[0];
            calendars.Islamic_calendar[num]["islamic-month-"+num]=date[1];
            calendars.Islamic_calendar[num]["day-"+num]=date[2];
        },
        "current_month_name":function(num){
            return islamicMonths[calendars.Islamic_calendar[num]["islamic-month-"+num]];
        }
    }
};