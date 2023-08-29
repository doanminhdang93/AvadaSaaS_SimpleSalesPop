import React from 'react';
import './NotificationPopup.scss';
import {CLOSE_POPUP_ICON} from '../../config/theme';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Iphone 15 pro max',
  timestamp = 'a day ago',
  productImage = 'https://newphone15.com/wp-content/uploads/2023/04/apple-iphone-15-pro-max-1-500x429.png'
}) => {
  return (
    <div className="Avada-SP__Wrapper">
      <div className="Avada-SP__Inner">
        <div className="Avada-SP__Container">
          <img className="Avada-SP__Image" src={productImage} alt="" />

          <div className="Avada-SP__Content">
            <div>
              {firstName} in {city}, {country}
            </div>
            <div style={{fontWeight: 'bold'}}>{productName}</div>
            <div className="Avada-SP__Footer">
              {timestamp}
              <div>
                <span className="uni-blue">by Avada</span>
              </div>
            </div>
          </div>
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

export default NotificationPopup;
