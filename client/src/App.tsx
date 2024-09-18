import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MaeGeul from "./pages/MaeGeul/Maeguel";
import AIWriting from "./pages/AIWriting/AIWriting";
import Dashboard from "./pages/Archiving/Dashboard"; // Article 페이지
import MgWriting from "./pages/MaeGeul/MgWriting";
import EmotionForm from "./components/EmotionForm";
import Mypage from "./pages/Auth/Mypage";
import MainLogin from "./pages/Auth/MainLogin";
import MainSignup from "./pages/Auth/MainSignup";
import EmailLogin from "./pages/Auth/EmailLogin";
import SignupForm from "./pages/Auth/SignupStep1";
import SignupForm2 from "./pages/Auth/SignupStep2";
import SignupForm3 from "./pages/Auth/SignupStep3";
import Logout from "./pages/Auth/Logout";
import LoginSuccess from "./pages/Auth/LoginSuccess";
import KakaoCallback from "./pages/Auth/KakaoCallback";
import Blog from "./pages/Dashboard/blog";
import User from "./pages/Dashboard/user";
import DashboardHome from "./pages/Dashboard/home";
import { HelmetProvider } from "react-helmet-async";

//Context
import { HighlightProvider } from "./context/HighlightContext";
import { MoodProvider } from "./context/MoodContext";
import { UserProvider } from "./context/UserContext";

//Dashboard
import { ThemeProvider } from "./theme/theme-provider";

const App: React.FC = () => {
  return (
    <UserProvider>
      <HighlightProvider>
        <HelmetProvider>
          <ThemeProvider>
            <MoodProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/maegeul" element={<MaeGeul />} />
                  <Route path="/emotionForm" element={<EmotionForm />} />

                  <Route path="/mgwriting" element={<MgWriting />} />
                  <Route path="/login/success" element={<LoginSuccess />} />
                  <Route path="/email-login" element={<EmailLogin />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/mainlogin" element={<MainLogin />} />
                  <Route path="/mainsignup" element={<MainSignup />} />
                  <Route path="/kakao/callback" element={<KakaoCallback />} />

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/user" element={<User />} />

                  <Route path="/signupstep1" element={<SignupForm />} />
                  <Route path="/signupstep2" element={<SignupForm2 />} />
                  <Route path="/signupstep3" element={<SignupForm3 />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </Router>
            </MoodProvider>
          </ThemeProvider>
        </HelmetProvider>
      </HighlightProvider>
    </UserProvider>
  );
};

export default App;
