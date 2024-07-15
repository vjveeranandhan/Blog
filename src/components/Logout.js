// Assuming ApiService is correctly implemented to handle API requests
import ApiService from './apiService';

const Logout = async () => {
  try {

    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }
  

    console.log("Logout 2", token)
    const response = await ApiService.logout('/api/logout/', token);
    localStorage.removeItem('token');
    window.location.reload();
    console.log('Successful API response:', response.data);
    console.log("localStorage.getItem('token')", localStorage.getItem('token'));
  } catch (error) {
    console.error('Error fetching data:', error);
    localStorage['token']=''
    window.location.reload();
  }
};

export default Logout;
