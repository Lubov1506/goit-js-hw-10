import iziToast from 'izitoast';
import iconSuccess from '../img/icon-success.svg';
import iconWarn from '../img/icon-warn.svg';
import iconError from '../img/icon-error.svg';

const form = document.querySelector('.form');
const fieldset = form.querySelector('fieldset');

const checkDelayInput = delay => {
  if (delay.value === '') {
    iziToast.warning({
      title: 'Caution',
      message: `You forgot important data`,
      position: 'topRight',
      backgroundColor: '#FFA000',
      theme: 'dark',
      iconUrl: iconWarn,
    });

    delay.focus();

    return false;
  }
  return true;
};
const FulfilledPromise = delay => {
  iziToast.success({
    title: 'OK',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    backgroundColor: '#59a10d',
    theme: 'dark',
    iconUrl: iconSuccess,
  });
};
const rejectedPromise = err => {
  iziToast.error({
    title: 'Error',
    message: err,
    position: 'topRight',
    backgroundColor: '#ef4040',
    theme: 'dark',
    iconUrl: iconError,
  });
};
const generatePromise = (state, delayValue) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (state) {
        case 'fulfilled':
          res(delayValue);
          break;
        case 'rejected':
          rej(`Rejected promise in ${delayValue}ms`);
          break;
      }
    }, delayValue);
  });
};

const onFormSubmit = e => {
  e.preventDefault();
  const delay = document.querySelector('[name="delay"]');
  const state = document.querySelector('input[name="state"]:checked').value;

  if (!checkDelayInput(delay)) {
    return;
  }

  const { value: delayValue } = delay;

  generatePromise(state, delayValue)
    .then(delay => {
      FulfilledPromise(delay);
    })
    .catch(err => {
      rejectedPromise(err);
    });

  form.reset();
  fieldset.classList.remove('focus');

};

form.addEventListener('submit', onFormSubmit);

fieldset.addEventListener('change', () => {
  fieldset.classList.add('focus');
});
