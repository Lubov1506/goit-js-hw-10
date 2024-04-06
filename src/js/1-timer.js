import flatpickr from 'flatpickr';
import izitoast from 'izitoast';
// import 'flatpickr/dist/flatpickr.min.css';
// import 'izitoast/dist/css/izitoast.min.css';
const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', true);

const timer = document.querySelector('.timer');

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

const iconError = `<symbol id="icon-error" viewBox="0 0 32 32">
<path d="M9.080 0.292c0.187-0.187 0.441-0.292 0.706-0.292h12.428c0.265 0 0.519 0.105 0.706 0.292l8.788 8.788c0.187 0.187 0.292 0.441 0.292 0.706v12.428c0 0.265-0.105 0.519-0.292 0.706l-8.788 8.788c-0.187 0.187-0.441 0.292-0.706 0.292h-12.428c-0.265 0-0.519-0.105-0.706-0.292l-8.788-8.788c-0.187-0.187-0.292-0.441-0.292-0.706v-12.428c0-0.265 0.105-0.519 0.292-0.706l8.788-8.788zM10.2 2l-8.2 8.2v11.6l8.2 8.2h11.6l8.2-8.2v-11.6l-8.2-8.2h-11.6z"></path>
<path d="M9.292 9.292c0.093-0.093 0.203-0.167 0.325-0.217s0.252-0.076 0.383-0.076c0.132 0 0.262 0.026 0.383 0.076s0.232 0.124 0.325 0.217l5.292 5.294 5.292-5.294c0.093-0.093 0.203-0.167 0.325-0.217s0.252-0.076 0.383-0.076c0.131 0 0.262 0.026 0.383 0.076s0.232 0.124 0.325 0.217c0.093 0.093 0.167 0.203 0.217 0.325s0.076 0.252 0.076 0.383-0.026 0.262-0.076 0.383c-0.050 0.121-0.124 0.232-0.217 0.325l-5.294 5.292 5.294 5.292c0.093 0.093 0.167 0.203 0.217 0.325s0.076 0.252 0.076 0.383-0.026 0.262-0.076 0.383c-0.050 0.121-0.124 0.232-0.217 0.325s-0.203 0.167-0.325 0.217c-0.121 0.050-0.252 0.076-0.383 0.076s-0.262-0.026-0.383-0.076c-0.121-0.050-0.232-0.124-0.325-0.217l-5.292-5.294-5.292 5.294c-0.093 0.093-0.203 0.167-0.325 0.217s-0.252 0.076-0.383 0.076-0.262-0.026-0.383-0.076c-0.121-0.050-0.232-0.124-0.325-0.217s-0.167-0.203-0.217-0.325c-0.050-0.121-0.076-0.252-0.076-0.383s0.026-0.262 0.076-0.383c0.050-0.121 0.124-0.232 0.217-0.325l5.294-5.292-5.294-5.292c-0.093-0.093-0.167-0.203-0.217-0.325s-0.076-0.252-0.076-0.383c0-0.132 0.026-0.262 0.076-0.383s0.124-0.232 0.217-0.325z"></path>
</symbol>
`;
izitoast.settings({
  title: 'Error',
  message: 'Illegal operation',
  position: 'topRight',
  backgroundColor: '#EF4040',
  iconColor: 'white',
  theme: 'dark',
});
const checkData = data => {
  if (data.getTime() > Date.now()) {
    userSelectedDate = data;
    startBtn.removeAttribute('disabled');
  } else {
    startBtn.setAttribute('disabled', true);
    izitoast.error();
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
