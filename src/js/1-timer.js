import 'izitoast/dist/css/izitoast.min.css';
import flatpickr from 'flatpickr';
import izitoast from 'izitoast';
// import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', true);

const timer = document.querySelector('.timer');
const iconError = './img/icon-error.svg'


const timerValues = {
  days: timer.querySelector('[data-days]'),
  hours: timer.querySelector('[data-hours]'),
  minutes: timer.querySelector('[data-minutes]'),
  seconds: timer.querySelector('[data-seconds]'),
};

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkData(selectedDates[0]);
  },
};
flatpickr(datetimePicker, options);

const izitoastOptions = {
  title: 'Error',
  message: 'Illegal operation',
  position: 'topRight',
  backgroundColor: '#EF4040',
  theme: 'dark',
  icoтUrl: iconError,
};
const checkData = data => {
  if (data.getTime() > Date.now()) {
    userSelectedDate = data;
    startBtn.removeAttribute('disabled');
  } else {
    startBtn.setAttribute('disabled', true);
    izitoast.error(izitoastOptions);
  }
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const setValues = () => {
  let { days, hours, minutes, seconds } = convertMs(
    userSelectedDate.getTime() - Date.now()
  );
  if (days < 0 && hours < 0 && minutes < 0 && seconds < 0) {
    return null;
  }

  timerValues.days.textContent = addLeadingZero(days);
  timerValues.hours.textContent = addLeadingZero(hours);
  timerValues.minutes.textContent = addLeadingZero(minutes);
  timerValues.seconds.textContent = addLeadingZero(seconds);
  return true;
};

const stopTimer = intervalId => {
  clearInterval(intervalId);
};

const start = () => {
  datetimePicker.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  setValues();
  const timerIntervalId = setInterval(() => {
    setValues() ? setValues() : stopTimer(timerIntervalId);
  }, 1000);
};

startBtn.addEventListener('click', start);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
