import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/axios";
import { Alert } from "@mui/material";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import mascot_nobg from "../../asset/images/mascot_nobg.svg";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [checkPasswordHelperText, setCheckPasswordHelperText] = useState("");
  const [userNameHelperText, setUserNameHelperText] = useState("");

  const [joinError, setJoinError] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,16}$/.test(password);

  const validateName = (name: string) => /^[a-z0-9]+$/.test(name);

  const checkEmailAvailability = async (email: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.get("/users/get-users");
      const users = response.data;
      return !users.some((user: { email: string }) => user.email === email);
    } catch (error) {
      return false;
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailHelperText(t("유효한 이메일을 입력해주세요."));
      setEmailError(true);
    } else {
      const isAvailable = await checkEmailAvailability(value);
      if (!isAvailable) {
        setEmailHelperText(t("이미 사용 중인 이메일입니다."));
        setEmailError(true);
      } else {
        setEmailHelperText("");
        setEmailError(false);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(true);
      setPasswordHelperText(
        t("8~16자의 영문 소문자, 숫자, 특수문자를 사용해 주세요")
      );
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

  const handleCheckPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCheckPassword(value);

    if (value !== password) {
      setCheckPasswordError(true);
      setCheckPasswordHelperText(t("비밀번호가 일치하지 않습니다."));
    } else {
      setCheckPasswordError(false);
      setCheckPasswordHelperText("");
    }
  };

  const checkUsernameAvailability = async (
    username: string
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.get("/users/get-users");
      const users = response.data;
      return !users.some(
        (user: { fullName: string }) => user.fullName === username
      );
    } catch (error) {
      return false;
    }
  };

  const handleUserNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setUserName(value);

    if (!validateName(value)) {
      setUserNameError(true);
      setUserNameHelperText(
        t("아이디는 영문 소문자 또는 숫자만 입력 가능합니다.")
      );
    } else {
      const isAvailable = await checkUsernameAvailability(value);
      if (!isAvailable) {
        setUserNameError(true);
        setUserNameHelperText(t("이미 사용 중인 아이디입니다."));
      } else {
        setUserNameError(false);
        setUserNameHelperText("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password || !checkPassword || !userName) {
      setJoinError(true);
      return;
    }
    if (emailError || passwordError || checkPasswordError || userNameError) {
      setJoinError(true);
      return;
    }
    try {
      await axiosInstance.post("/signup", {
        email,
        fullName: userName,
        password,
      });
      navigate("/join-success"); // 성공 시 이동
    } catch (error) {
      setJoinError(true); // 에러 상태 설정
    }
  };

  const { t } = useTranslation();

  const { i18n } = useTranslation(); // i18n을 사용하여 언어 변경
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // 언어 선택 메뉴 상태
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || "ko"
  ); // 기본 언어 상태

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang); // 언어 변경
    setSelectedLanguage(lang);
    setIsLanguageMenuOpen(false); // 새로고침 없이 언어 변경이 되도록 처리 (URL에 쿼리 추가 등 필요 시)
  };

  useEffect(() => {
    if (!joinError) return;
    const timer = setTimeout(() => {
      setJoinError(false); // 에러 메시지 숨기기
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [joinError]);

  return (
    <main className="flex items-center justify-center">
      <FormContainer>
        <header className="flex items-center justify-center mt-8 mb-4">
          <img src={mascot_nobg} alt="Runtime Logo" className="w-20 h-20" />
        </header>
        <h1 className="mt-5 text-2xl font-bold text-center">{t("회원가입")}</h1>
        <section className="mt-7">
          <Input
            label={t("이메일")}
            value={email}
            type="text"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailHelperText}
            autoComplete="one-time-code"
          />
        </section>
        <section className="mt-4">
          <Input
            label={t("비밀번호")}
            value={password}
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordHelperText}
            autoComplete="one-time-code"
          />
        </section>
        <section className="mt-4">
          <Input
            label={t("비밀번호 확인")}
            value={checkPassword}
            type="password"
            onChange={handleCheckPasswordChange}
            error={checkPasswordError}
            helperText={checkPasswordHelperText}
            autoComplete="one-time-code"
          />
        </section>
        <section className="mt-4">
          <Input
            label={t("아이디")}
            value={userName}
            type="text"
            onChange={handleUserNameChange}
            error={userNameError}
            helperText={userNameHelperText}
            autoComplete="one-time-code"
          />
        </section>
        {joinError && (
          <Alert severity="error" className="mt-4">
            {t("입력한 정보를 다시 확인해주세요.")}
          </Alert>
        )}
        <footer className={`${joinError ? "mt-5" : "mt-8"} `}>
          <SubmitButton
            value={t("회원가입")}
            onClick={handleSubmit}
            size="xl"
          />
        </footer>

        <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-10 ">
          <button onClick={() => navigate("/login")}>{t("로그인")}</button>
        </div>
      </FormContainer>

      <div className="fixed bottom-4 right-4">
        <LanguageIcon
          onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
          style={{
            color: "#4f4f4f",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#ebebeb",
            padding: "8px",
          }}
        >
          {selectedLanguage === "ko" ? "한국어" : "English"}
        </LanguageIcon>

        {isLanguageMenuOpen && (
          <div className="absolute right-0 bg-white rounded-md shadow-lg bottom-[50px]">
            <button
              className="w-20 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleLanguageChange("ko")}
            >
              한국어
            </button>
            <button
              className="w-20 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleLanguageChange("en")}
            >
              English
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
