import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";

// 환경 변수에서 BASE_URL을 가져오고, 없으면 기본값으로 localhost 사용
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const KakaoCallback = () => {
  const location = useLocation();
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const userId = queryParams.get("userId");

    if (token && userId) {
      sessionStorage.setItem("token", token);

      axios
        .get(`${BASE_URL}/api/user/${userId}`)
        .then((response) => {
          const { profile_name, profile_picture, email } = response.data.user;
          setUser({
            user_id: Number(userId),
            profile_name: profile_name || null,
            profile_picture: profile_picture || null,
            email: email || null,
            isKakaoUser: true, // 카카오 사용자 여부 저장
          });
          navigate("/"); // 사용자 정보가 설정된 후 홈으로 리다이렉트
        })
        .catch((error) => {
          console.error("사용자 정보를 가져오는데 실패했습니다:", error);
        });
    }
  }, [location, setUser, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
