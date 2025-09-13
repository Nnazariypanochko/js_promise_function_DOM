'use strict';

function waitFor(element, eventName) {
  // Перевірка, що переданий дійсний DOM-елемент
  if (!element || typeof element.addEventListener !== 'function') {
    throw new TypeError('waitFor: first argument must be a DOM element');
  }

  return new Promise((resolve) => {
    element.addEventListener(
      eventName,
      () => {
        resolve(
          `It was ${eventName} on the element: ${element.nodeName}, id: ${element.id}.`,
        );
      },
      { once: true }, // виконається лише один раз
    );
  });
}

// Функція виводить повідомлення у DOM
const printMessage = (message) => {
  const div = document.createElement('div');

  div.className = 'message';
  div.textContent = message;

  if (document.body) {
    document.body.append(div);
  }
};

// Експортуємо функції для інших файлів або тестів
// В залежності від системи модулів можна використовувати один з варіантів:

// 1️⃣ ES Modules
// export { waitFor, printMessage };

// 2️⃣ Глобальна доступність через window
window.waitFor = waitFor;
window.printMessage = printMessage;

// Приклад використання (необов'язково, можна коментувати)

const loginField = document.getElementById('login');
const passwordField = document.getElementById('password');
const button = document.getElementById('submit');

waitFor(loginField, 'click').then(printMessage);
waitFor(passwordField, 'click').then(printMessage);
waitFor(button, 'click').then(printMessage);

waitFor(loginField, 'input').then(printMessage);
waitFor(passwordField, 'input').then(printMessage);

waitFor(loginField, 'blur').then(printMessage);
waitFor(passwordField, 'blur').then(printMessage);
waitFor(button, 'blur').then(printMessage);
