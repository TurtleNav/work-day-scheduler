// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Today's date - updated whenever time related elements are rendered
var todayDate;

function updateTime() {
  todayDate = dayjs();
}

/*
  Using only an integer representing the 24-hour clock hour number, this
  function dynamically build and subsequently render a time block HTML
  element.
*/
function renderTimeBlock(hour24) {
  var currentHourNumber = Number(todayDate.format('H'));

  var ppf; // A string of: "past", "present", or "future"
  var end; // A string of "AM" or "PM" denoting if we are before or after midday
  if (hour24 < currentHourNumber) {
    ppf = "past";
  } else if (hour24 == currentHourNumber) {
    ppf = "present";
  } else {
    ppf = "future";
  }
  end = (hour24 < 12 ? 'AM': 'PM');
  $('div.px-5').append($(`
  <div id="hour-${hour24}" class="row time-block ${ppf}">
    <div class="col-2 col-md-1 hour text-center py-3">${hour24 % 12 || 12}${end}</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>
`));
}

function renderTimeBlocks(start, end) {
  for (let i=start; i<end+1; i++) {
    renderTimeBlock(i);
  }
}

function renderDate() {
  var daySuffix;
  switch (Number(todayDate.format("D"))) {
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

// A method for the temporary display of a message in the header. Used for providing
// feedback to the user
var feedbackQueue = [];
var messageDisplayed = false;
function displayFeedback(message, duration) {
  // If a message is currently being displayed, push the feedback to the queue
  if (messageDisplayed) {
    feedbackQueue.push({message: message, duration: duration});
  } else {
    messageDisplayed = true;
    $('div#feedback').text(message);
    setTimeout(() => {

      $('div#feedback').text('');
      messageDisplayed = false;

      if (feedbackQueue.length) {
        var nextInQueue = feedbackQueue.shift();
        displayFeedback(nextInQueue.message, nextInQueue.duration);
      }
    }, 1000*duration);
  }
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

  updateTime();
  renderDate();
  renderTimeBlocks(9, 17); // 0 to 23 for full day
});
