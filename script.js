const addDays = (date, days) => {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

const getTimeRemaining = (remainingDays) => {
  const date = new Date();
  const deadline = addDays(date, remainingDays);
  deadline.setHours(0);
  deadline.setMinutes(0);
  deadline.setSeconds(0);
  const t = deadline - date;
  // var t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

const initializeClock = (id, remainingDays) => {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  const updateClock = () => {
    const t = getTimeRemaining(remainingDays);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
const remainingDays = 730
initializeClock('clockdiv', remainingDays);