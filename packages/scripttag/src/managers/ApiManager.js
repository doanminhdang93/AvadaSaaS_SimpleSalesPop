import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = 'https://localhost:3000';
export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    try {
      const response = await makeRequest(
        `${BASE_URL}/clientApi/notifications?shopifyDomain=avada-saas-training.myshopify.com`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
}
