'use strict';

import dom from './helpers/dom.js';
import settings from './helpers/settings.js';

// FUNCTIONS
const domMapping = () => {
  settings.elements.signupButton = dom.$('#signupButton');
  settings.elements.usernameField = dom.$('#usernameField');
  settings.elements.passwordField = dom.$('#passwordField');

};

const appendEventListeners = () => {
  settings.elements.signupButton.addEventListener('click', () => {
    // Create an object with the data
    const data = {
      username: settings.elements.usernameField.value,
      password: settings.elements.passwordField.value
    };

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent successfully');
          const token = response.headers.get('Authorization');
          // save token to localeStorage
          localStorage.setItem('token', token);
        } else {
          console.log('Error sending data');
        }
      })
      .catch(error => {
        console.log('An error occurred:', error.message);
      });
  });
};

const init = () => {
  domMapping();
  appendEventListeners();
};

// INIT
init();

