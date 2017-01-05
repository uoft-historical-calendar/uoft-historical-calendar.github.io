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
        1:{"day-1":1, "french-month-1":1, "décade-1":1,"year-french-revolution-1":300},
        2:{"day-2":1, "french-month-2":1, "décade-2":1,"year-french-revolution-2":300}
    },
    "Hebrew_calendar":{
        1:{"day-1":1, "hebrew-month-1":1,"hebrew-year-1":5016},
        2:{"day-2":1, "hebrew-month-2":1,"hebrew-year-2":5016}
    },
    "Islamic_calendar":{
        1:{"day-1":1, "islamic-month-1":1,"islamic-year-1":1400},
        2:{"day-2":1, "islamic-month-2":1,"islamic-year-2":1400}
    }
};