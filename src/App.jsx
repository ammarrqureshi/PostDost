import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
