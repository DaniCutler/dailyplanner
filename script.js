// code that is within this function will run after the entire page is ready
$(document).ready(function() {

// this shows current day and time
$("#currentDay").text(moment().format ("MMMM Do YYYY, h:mm:ss a"));

$(".saveBtn").on("click", function () {
    // values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    console.log(this);
    
    
   localStorage.setItem(value, time);
//  uses local storage to save items

})

