import iziToast from 'izitoast';

const form = document.querySelector('.form');

const getFulfilledPromise = delay => {
  setTimeout(() => {
    iziToast.success({
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
      icon: '',
      backgroundColor: '#59a10d',
      theme: 'dark',
    });
  }, delay);
};
const getRejectedPromise = delay => {
  setTimeout(() => {
    iziToast.success({
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
      icon: '',
      backgroundColor: '#ef4040',
      theme: 'dark',
    });
    console.log(`Rejected promise in ${delay}ms`);
  }, delay);
};

const onFormSubmit = e => {
  e.preventDefault();
  const delay = document.querySelector('[name="delay"]').value;
  const state = document.querySelector('input[name="state"]:checked').value;

  switch (state) {
    case 'fulfilled':
      getFulfilledPromise(delay);
      break;
    case 'rejected':
      getRejectedPromise(delay);
      break;
  }

  form.reset();
};

form.addEventListener('submit', onFormSubmit);
