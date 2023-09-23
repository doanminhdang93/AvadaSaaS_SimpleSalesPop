import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'react';
import lazy from 'preact-lazy';

const NotificationPopup = lazy(() => import('../components/NotificationPopup/NotificationPopup'));
const delay = s => new Promise(res => setTimeout(res, s * 1000));
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    if (this.checkUrls(settings)) {
      this.insertContainer();
      this.displayPopups(notifications, settings);
    }
  }

  checkUrls(settings) {
    const {allowShow, includedUrls, excludedUrls} = settings;
    const listIncludedUrls = includedUrls.split('\n');
    const listExcludedUrls = excludedUrls.split('\n');
    const uniqueIncludesUrls = [...new Set(listIncludedUrls)];
    const uniqueExcludesUrls = [...new Set(listExcludedUrls)];

    const currentUrl = window.location.href.replace(/[?#].*$/, '');
    if (allowShow === 'all' && !uniqueExcludesUrls.includes(currentUrl)) {
      return true;
    }
    if (allowShow === 'specific' && uniqueIncludesUrls.includes(currentUrl)) {
      return true;
    }
    return false;
  }

  async displayPopups(notifications, settings) {
    const {firstDelay, displayDuration, popsInterval} = settings;
    await delay(firstDelay);
    for (let i = 0; i < notifications.length; i++) {
      this.display({notification: notifications[i]}, settings);
      await delay(displayDuration);
      this.fadeOut();
      if (i < notifications.length - 1) {
        await delay(popsInterval);
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
