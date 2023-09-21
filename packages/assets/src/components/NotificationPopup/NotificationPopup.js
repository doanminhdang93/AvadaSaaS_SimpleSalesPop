import React from 'react';
import './NotificationPopup.scss';
import {CLOSE_POPUP_ICON} from '../../config/theme';
import moment from 'moment';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Iphone 15 pro max 256GB',
  timestamp = `${new Date()}`,
  productImage = 'https://newphone15.com/wp-content/uploads/2023/04/apple-iphone-15-pro-max-1-500x429.png',
  settings = {hideTimeAgo: false, truncateProductName: false}
}) => {
  const {hideTimeAgo, truncateProductName} = settings;
  return (
    <div className="Avada-SP__Wrapper fadeInUp animated">
      <div className="Avada-SP__Inner">
        <div className="Avada-SP__Container">
          <a href="#" className={'Avada-SP__LinkWrapper'}>
            <div
              className="Avada-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle${truncateProductName ? '--truncated' : ''}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div
        className="Avada-SP__ClosePopup"
        onClick={() => {
          alert('test');
        }}
      >
        <img src={CLOSE_POPUP_ICON} alt="" />
      </div>
    </div>
  );
};

NotificationPopup.PropTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  productImage: PropTypes.string,
  timestamp: PropTypes.string,
  truncateProductName: PropTypes.bool,
  hideTimeAgo: PropTypes.bool
};

export default NotificationPopup;
