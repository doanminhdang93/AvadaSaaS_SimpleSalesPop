import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    try {
      const response = await makeRequest(
        'https://localhost:3000/clientApi/notifications?shopifyDomain=avada-saas-training.myshopify.com'
      );
      const {notifications, settings} = response.data;
      return {notifications, settings};
    } catch (error) {
      console.error(error);
      return {};
    }
  };
}
