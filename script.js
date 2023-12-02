// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Today's date - updated whenever time related elements are rendered
var todayDate;

function updateTime() {
  todayDate = dayjs();
}

function renderTimeBlock(hour) {
  // Create parent div
  /*
  var pDiv = $("<div>")
  pDiv.addClass('row time-block');
  pDiv.attr("id", `hour-${hour}`)
  */

  var pDiv = $(`<div id="hour-${hour}" class="row time-block">`);

  if (hour < todayDate.format('H')) {
    pDiv.addClass("past");
  } else if (hour === todayDate.format('H')) {
    pDiv.addClass("present");
  } else {
    pDiv.addClass("future");
  }

  if (hour > 12) {
    end = "PM";
    hour -= 12;
  } else if (hour === 12) {
    end = "PM";
  } else {
    end = "AM";
  }

  var textDiv = $('<div class="col-2 col-md-1 hour text-center py-3">');
  //var $textDiv = $('<class="col-2 col-md-1 hour text-center py-3">');
  //$textDiv.text(`${hour}${end}`);
  textDiv.text(`${hour}${end}`);

  //$pDiv.append($textDiv);
  pDiv.append(textDiv);

  //$pDiv.append($('<textarea class="col-8 col-md-10 description" rows="3">'));
  pDiv.append($('<textarea class="col-8 col-md-10 description" rows="3">'));

  var buttonEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
  buttonEl.append($('<i class="fas fa-save" aria-hidden="true">'));

  //$pDiv.append(buttonEl);
  pDiv.append(buttonEl);
  
  //$('div.px-5').append($pDiv);
  $('div.px-5').append(pDiv);

}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  function renderDate() {
    updateTime();
    var dayNumber = Number(todayDate.format("D"));
    var daySuffix;
    switch (dayNumber) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
    }
    $('p#currentDay').text(todayDate.format(`dddd, MMMM D[${daySuffix}]`));
  }
  renderDate();
  for (let i=9; i<18; i++) {
    renderTimeBlock(i);
  }


});

console.log("yo");