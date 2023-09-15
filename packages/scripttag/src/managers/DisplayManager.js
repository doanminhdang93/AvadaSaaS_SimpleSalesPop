import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'react';
import lazy from 'preact-lazy';

const NotificationPopup = lazy(() => import('../components/NotificationPopup/NotificationPopup'));

const delay = ms => new Promise(res => setTimeout(res, ms));
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.checkAndInsertContainer(settings);
    this.displayPopups(notifications, settings);
  }

  checkAndInsertContainer(settings) {
    const {allowShow, includedUrls, excludedUrls} = settings;

    // if (allowShow === 'all' && excludedUrls === '') {
    //   this.insertContainer();
    // }

    const listIncludedUrls = includedUrls.split('\n');
    const listExcludedUrls = excludedUrls.split('\n');

    const uniqueIncludesUrls = [...new Set(listIncludedUrls)];
    const uniqueExcludesUrls = [...new Set(listExcludedUrls)];

    if (allowShow === 'all') {
      for (const url of uniqueExcludesUrls) {
        if (window.location.href !== url) {
          this.insertContainer();
        }
      }
    }
    if (allowShow === 'specific') {
      for (const url of uniqueIncludesUrls) {
        if (window.location.href === url) {
          this.insertContainer();
        }
      }
    }
  }

  async displayPopups(notifications, settings) {
    const {maxPopsDisplay, firstDelay, displayDuration, popsInterval} = settings;
    const popupsDisplayed = Math.min(maxPopsDisplay, notifications.length);
    await delay(firstDelay * 1000);
    for (let i = 0; i < popupsDisplayed; i++) {
      this.display({notification: notifications[i]}, settings);
      await delay(displayDuration * 1000);
      this.fadeOut();
      if (i < popupsDisplayed - 1) {
        await delay(popsInterval * 1000);
      }
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.classList.add('fadeOut');
  }

  display({notification}, settings) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} settings={settings} />, container);
    container.classList.remove('fadeOut');
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
