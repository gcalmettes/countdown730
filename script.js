const getTimeRemaining = (endtime) => {
  const t = Date.parse(endtime) - Date.now();
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

const initializeClock = (id, endtime, OOC) => {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  const updateClock = () => {

    const now = Date.now()
    let toAdd = 0

    for (out of OOC) {
      // Do we need to add any time?
      if ( now > Date.parse(out.start)){
        if ( now > Date.parse(out.end)){
          // need to add the full period
          toAdd += (Date.parse(out.end) - Date.parse(out.start))
        } else {
          // add only time spent since beginning of period to freeze time
          toAdd += Date.now() - Date.parse(out.start)
        }
      }
    }
    
    const correctedEnd = new Date(Date.parse(endtime) + toAdd)
    const t = getTimeRemaining(correctedEnd);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    /*
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
    */
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const dueDays = 730
// out of country
const OOC = [
  {'start': '2019/10/17', 'end': '2019/10/31'}
]

const deadline = new Date(Date.parse(new Date('2019/09/16')) + dueDays * 24 * 60 * 60 * 1000);

initializeClock('clockdiv', deadline, OOC);
