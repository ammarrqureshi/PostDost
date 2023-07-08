import Sidebar from '../components/pages/Layout';
import Explore from '../components/pages/Explore';
import ContentManager from '../components/pages/ContentManager';
import Influencer from '../components/pages/Influencer/Influencer';
import SignUp from '../components/pages/SignUp';
import LogIn from '../components/pages/LogIn/LogIn';
import ForgotPassword from '../components/pages/ResetPassword/ForgotPassword';
import ResetPassword from '../components/pages/ResetPassword/ResetPassword';
import ConfirmPage from '../components/pages/LogIn/ConfirmPage';
import Home from '../components/pages/Home';
import {
  createBrowserRouter,
  Route,
  Navigate,
  createRoutesFromElements,
} from 'react-router-dom';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/confirmpage" element={<ConfirmPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route element={<Sidebar />}>
        {/* <Route  element={<Navigate to="/explore" />} /> */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/:username" element={<Influencer />} />
        <Route path="/contentmanager" element={<ContentManager />} />

        <Route
          path="*"
          element={
            <h1 className="font-bold flex items-center justify-center text-5xl text-red">
              Page Not Found
            </h1>
          }
        />
      </Route>
    </>
  )
);
export default router;
