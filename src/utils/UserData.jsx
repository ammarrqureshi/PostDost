import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export const userDataLoader = async () => {
  const token = Cookies.get('token');
  console.log(token);
  if (token) {
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/info`,
      { id: id }
    );
    console.log(response.status);
    if (response.status == 200) {
      return response.data.user;
    } else {
      return '';
    }
  }
};
