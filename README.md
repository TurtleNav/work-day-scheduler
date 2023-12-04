# Work Day Scheduler by Luc Tourangeau

A simple web app to help a user make a schedule for work

---

DEPLOYMENT URL - https://turtlenav.github.io/work-day-scheduler/

This app had to achieve the following acceptance criteria:

* <a name="c1"><a>Have a header with today's date in the human readable format: [day name],
  [month name] [day of the month] (for example: Sunday, December 3rd)
* <a name="c2"><a>Present the user with time blocks for each hour of the work day (generally, 9am - 5pm)
* <a name="c3"><a>Color-code the time blocks based on whether it reflects a time in the past,
  present, or future. Grey for past, red for present, and green for future
* <a name="c4"><a>Upon clicking a time block's corresponding save button, the event, as input by the user,
  is saved into local storage
* <a name="c5"><a>Upon opening/reloading the page, any saved events should be read from local storage in
  the exact time slot the user specified

I further built upon these criteria to provide the user some quality-of-life improvements
such as:
* Provide feedback inside the header as the user acts:
    * Whenever a user wishes to schedule an event in the past, provide a message saying
      this time is in the past
    * Whenever an event is saved, provide a message stating the save was successful and what
      time it was saved at
    * Whenever a user clears an event that has been previously saved, provide a message
      saying this event was cleared from the schedule
    * Whenever a user schedules an event in the current hour, provide a message saying they
      better hurry

TODO - PLACE SOME DEMO VIDS/IMAGES HERE


## #1

To achieve [criterion #1](#c1), I made use of the third-party [Day.js library](https://day.js.org/).
Day.js allows us to manipulate and format time and datetimes with ease.

### Our Header Tag (inside index.html)
```html
...
<header>
  ...
  <p id="currentDay" class="lead"></p>
</header>
```

### script.js
```javascript
var todayDate = dayjs();
// Using a helper method, the day number for this month is used to create an appropriate suffix:
// 'st', 'nd', 'rd, and 'th'
// These strings are appended to the number like so:
// 1 --> 1st | 2 --> 2nd | 3 --> 3rd | 4>= --> 4th, 5th, ...
// The variable `daySuffix` will be on these 4 strings
var daySuffix;
$('p#currentDay').text(todayDate.format(`dddd, MMMM D[${daySuffix}]`));
```

Minus the code to generate an appropriate suffix the above code block makes great use of JQuery to target
the \<p> tag with its unique id: 'currentDay' and dayjs to format our date we can set the date with ease.

## #2

To achieve [#2](#c2), I designed a factory function that builds our HTML inside javascript and appends it
to the index.html file. Using this factory function, I can generate an arbitrary number of time blocks
(anywhere from 0 to 24):

Within our index.html file we have a \<div> tag like so: `<div class="container-lg px-5"></div>`. The factory
function will be appending our new html inside this container. The javascript to achieve this is as follows:

```javascript
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
```





