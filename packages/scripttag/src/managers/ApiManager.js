import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = 'https://localhost:3000';
export default class ApiManager {
  getNotifications = async () => {
    const {notifications, settings} = await this.getApiData();
    return {notifications, settings};
  };

  getApiData = async () => {
    try {
      const response = await makeRequest(
        `${BASE_URL}/clientApi/notifications?shopifyDomain=${window.Shopify.shop}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
}
