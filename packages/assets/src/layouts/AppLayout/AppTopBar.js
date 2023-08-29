import React from 'react';
import {Button, Icon, TopBar} from '@shopify/polaris';
import {MobileCancelMajor, MobileHamburgerMajor} from '@shopify/polaris-icons';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';
import '@assets/styles/layout/topbar.scss';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const userMenuMarkup = <TopBar.UserMenu name="Avada" initials="A" />;

  return (
    <TopBar
      userMenu={userMenuMarkup}
      secondaryMenu={
        <div className="Avada-TopBar__Wrapper">
          <div className="Avada-TopBar__Title">
            <Button plain onClick={toggleOpenNav}>
              <Icon source={isNavOpen ? MobileCancelMajor : MobileHamburgerMajor} />
            </Button>
            <img alt="Simple Sales Pop" src={LOGO_URL} width={LOGO_WIDTH} />
          </div>
        </div>
      }
    />
  );
}
