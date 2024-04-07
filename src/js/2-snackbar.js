import iziToast from 'izitoast';
import iconSuccess from '../img/icon-success.svg';
import iconWarn from '../img/icon-warn.svg';
import iconError from '../img/icon-error.svg';

const form = document.querySelector('.form');
const fieldset = form.querySelector('fieldset');

const getFulfilledPromise = delay => {
  setTimeout(() => {
    iziToast.success({
      title: 'OK',
      message: `Fulfilled promise in ${delay}ms`,
      position: 'topRight',
      backgroundColor: '#59a10d',
      theme: 'dark',
      iconUrl: iconSuccess,
    });
  }, delay);
};
const getRejectedPromise = delay => {
  setTimeout(() => {
    iziToast.success({
      title: 'OK',
      message: `Rejected promise in ${delay}ms`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      theme: 'dark',
      iconUrl: iconError,
    });
  }, delay);
};

const onFormSubmit = e => {
  e.preventDefault();
  const delay = document.querySelector('[name="delay"]');
  const state = document.querySelector('input[name="state"]:checked').value;

  if (delay.value === '') {
    iziToast.success({
      title: 'Caution',
      message: `You forgot important data`,
      position: 'topRight',
      backgroundColor: '#FFA000',
      theme: 'dark',
      iconUrl: iconWarn,
    });
    delay.classList.add('autofocus');
    return;
  }

  switch (state) {
    case 'fulfilled':
      getFulfilledPromise(delay.value);
      break;
    case 'rejected':
      getRejectedPromise(delay.value);
      break;
  }

  form.reset();
  delay.classList.remove('autofocus');
};

form.addEventListener('submit', onFormSubmit);

fieldset.addEventListener('change', e => {
  fieldset.classList.add('focus');
});
