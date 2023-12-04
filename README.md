# Work Day Scheduler by Luc Tourangeau

DEPLOYMENT URL - https://turtlenav.github.io/work-day-scheduler/

This app had to achieve the following acceptance criteria:

* Have a header with today's date in the human readable format: [day name],
  [month name] [day of the month] (for example: Sunday, December 3rd)
* Present the user with time blocks for each hour of the work day (generally, 9am - 5pm)
* Color-code the time blocks based on whether it reflects a time in the past,
  present, or future. Grey for past, red for present, and green for future
* Upon clicking a time block's corresponding save button, the event, as input by the user,
  is saved into local storage
* Upon opening/reloading the page, any saved events should be read from local storage in
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
