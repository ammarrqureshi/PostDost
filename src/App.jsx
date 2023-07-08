import { RouterProvider} from 'react-router-dom';
import router from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainContext from './contexts/MainContext';
import { useEffect, useState } from 'react';
import { apiGetCall } from './utils/API';

function App() {
  const [userInformation, setUserInformation] = useState({
    email: '',
    firstName: '',
    secondName: '',
    isVerified: '',
  });
  useEffect(() => {
    (async () => {
      const res = await apiGetCall('/users');
      if (res.success) {
        setUserInformation({ ...res.userInfo });
        return;
      }
    })();
  }, []);

  return (
    <>
      <div className="App">
        <MainContext.Provider value={{ userInformation, setUserInformation }}>
          <ToastContainer />
          <RouterProvider router={router} />
        </MainContext.Provider>
      </div>
    </>
  );
}
export default App;
