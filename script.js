// variables
var scheduleText = "";
var scheduleTime = "";
var currentDate;
var currentTime;
var currentRow;
var tempArray = [];
var storedSchedule;
var returnedSchedule;





// current time, date, month

$(window).on ("load", function (){
    currentDate = moment().format ("MMMM dddd Do YYYY, h:mm: a");
    $("#currentDay").append(currentDate);
    currentTime = moment().format ("H");

    function renderSchedule() {
        storedSchedule = JSON.parse(localStorage.getItem("schedule"));
        if (storedSchedule !== null) {
            for (i = 0; i < storedSchedule.length; i++) {
                returnedSchedule = storedSchedule[i];
                details = returnedSchedule.details;
                timeIndex = returnedSchedule.time;
                timeIndex = timeIndex.replace (":00", '');
                if (details !== null){
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }


    // so the user is able to tell past, present and future...
    renderSchedule();

    for (i=0; i <= 23; i++) {
        currentRow = i;
        if (currentTime == i) {
            $('#' + currentRow).addClass("present");
            $('#' + currentRow).children('div').children('div').children('textarea').addClass("present");
        }

        else if (currentTime > i) {
            $('#' + currentRow).addClass("past");
            $('#' + currentRow).children('div').children('div').children('textarea').addClass("past");
        }

        else {
            $('#' + currentRow).addClass("future");
            $('#' + currentRow).children('div').children('div').children('textarea').addClass("future");
        }
    }

})
// time sched was saved

$(".saveBtn").click(function () {
    schedText = $(this).parent('div').children('div').children('textarea').val();
    schedTime = $(this).parent('div').parent().attr("id");
    schedule = {
        time: schedTime,
        details: schedText
    }
    tempArray = JSON.parse(localStorage.getItem("schedule"));
    if (tempArray === null) {
        localStorage.setItem("schedule", JSON.stringify([{ time: schedTime, details: schedText}]));
    }
    else {
        tempArray.push(schedule);
        localStorage.setItem("schedule", JSON.stringify(tempArray));
    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + schedText.addClass("textarea") + '</textarea>'));
})
// ---