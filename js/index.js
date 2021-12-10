"use strict";

(function () {
  const scheduleElement = document.getElementById('schedule')
  const locationIcon = `<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2372 6.3871C12.2997 2.90323 9.55254 1.68889e-06 6.18105 1.41465e-06C2.80956 1.14041e-06 -1.76429e-05 2.77419 -1.79702e-05 6.25806C-1.81339e-05 8 0.749202 10.2581 2.31008 12.9677C3.55878 15.0323 5.80643 18 5.99374 18C6.11861 18 8.49114 15.0968 9.73984 13.0323C11.3631 10.3226 12.2372 8.06452 12.2372 6.3871Z" fill="black" fill-opacity="0.29"/><ellipse cx="6.11862" cy="6.0937" rx="3.67118" ry="3.69501" fill="white"/></svg>`;
  const goToSiteIcon = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_535)"><path d="M8.12499 11.375H1.62499V1.62499H8.12499V2.43748H9.74997V0H0V13H9.75V10.5625H8.12501V11.375H8.12499Z" fill="#B5B5B5"/><path d="M10.3006 3L9.15164 4.14892L10.2022 5.19944H6V6.82445H10.2022L9.15164 7.87498L10.3006 9.0239L13.3125 6.01194L10.3006 3Z" fill="#B5B5B5"/></g><defs><clipPath id="clip0_1_535"><rect width="13" height="13" fill="white"/></clipPath></defs></svg`;

  async function creatSchedule() {
    const eventsList = await fetchGetSchedule();
    const listElement = document.createElement('ul');
    listElement.classList.add('events', 'list-reset');

    eventsList.forEach(function (el) {
      listElement.append(createCard(el));
    })

    scheduleElement.append(listElement);
  }

  function createCard(obj) {
    const itemElement = document.createElement('li');
    itemElement.classList.add('event');
    const dateElement = document.createElement(('span'));
    dateElement.classList.add('event__date');
    const logoElement = document.createElement(('img'));
    logoElement.classList.add('event__logo');
    const titleElement = document.createElement('h2');
    titleElement.classList.add('event__title', 'title-reset');
    const briefElement = document.createElement('p');
    briefElement.classList.add('event__brief', 'p-reset');
    const locationWrapperElement = document.createElement('div');
    locationWrapperElement.classList.add('event__location', 'location');
    const locationIconElement = document.createElement('span');
    locationIconElement.classList.add('location__icon');
    const locationElement = document.createElement('span');
    locationElement.classList.add('location__place');
    const goToSiteWrapperElement = document.createElement('div');
    goToSiteWrapperElement.classList.add('event__site', 'site');
    const goToSiteIconElement = document.createElement('span');
    goToSiteIconElement.classList.add('site__icon');
    const goToSiteElement = document.createElement('a');
    goToSiteElement.classList.add('site__url');
    const buttonsWrapperElement = document.createElement('div');
    buttonsWrapperElement.classList.add('event__buttons', 'buttons');
    const primaryButtonElement = document.createElement('a');
    primaryButtonElement.classList.add('button__primary');
    const secondaryButtonElement = document.createElement('a');
    secondaryButtonElement.classList.add('button_secondary');

    dateElement.textContent = obj.date_range;
    logoElement.setAttribute('src', obj.logo);
    logoElement.setAttribute('alt', `Логотип ${obj.name}`);
    titleElement.textContent = obj.name;
    briefElement.textContent = obj.brief;
    locationIconElement.innerHTML = locationIcon;
    locationElement.textContent = obj.location;
    goToSiteIconElement.innerHTML = goToSiteIcon;
    goToSiteElement.setAttribute('href', 'https://ontico.ru/' );
    goToSiteElement.setAttribute('target', '_blank');
    goToSiteElement.textContent = 'https://ontico.ru/';
    primaryButtonElement.setAttribute('href', '#');
    primaryButtonElement.setAttribute('target', '_blank');
    primaryButtonElement.textContent = 'Купить билет';
    secondaryButtonElement.setAttribute('href', obj.uri);
    secondaryButtonElement.setAttribute('target', '_blank');
    secondaryButtonElement.textContent = 'Подробнее';

    locationWrapperElement.append(locationIconElement);
    locationWrapperElement.append(locationElement);
    goToSiteWrapperElement.append(goToSiteIconElement);
    goToSiteWrapperElement.append(goToSiteElement);
    buttonsWrapperElement.append(primaryButtonElement);
    buttonsWrapperElement.append(secondaryButtonElement);

    itemElement.append(dateElement);
    itemElement.append(logoElement);
    itemElement.append(titleElement);
    itemElement.append(briefElement)
    itemElement.append(locationWrapperElement);
    itemElement.append(goToSiteWrapperElement);
    itemElement.append(buttonsWrapperElement);

    return itemElement;
  }

  async function fetchGetSchedule() {
    const response = await fetch('https://conf.ontico.ru/api/conferences/forCalendar.json');
    const data = await response.json();
    return data.result;
  }

  creatSchedule();
})()