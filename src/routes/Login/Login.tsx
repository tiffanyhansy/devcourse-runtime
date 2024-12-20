import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/axios";
import { useLoginStore } from "../../store/API";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import mascot_nobg from "/src/asset/images/mascot_nobg.svg";
import { useTranslation } from "react-i18next";
import SelectLanguageButton from "../../components/locales/SelectLanguageButton";

export default function Login() {
  const { t } = useTranslation();
  const login = t("로그인");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!validatePassword(value));
  };

  const navigate = useNavigate();

  // 로그인 + 로그인 시 유저정보 + 토큰값 전역변수, localStorage에 저장
  const setUser = useLoginStore((state) => state.setUser);
  const setToken = useLoginStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError(true); // 이메일 또는 비밀번호가 비어 있을 경우 에러 표시
      return;
    }

    if (emailError || passwordError) {
      setLoginError(true); // 유효성 검사가 실패한 경우 에러 표시
      return;
    }

    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("LoginUserInfo", JSON.stringify(res.data.user));
      localStorage.setItem("LoginUserToken", JSON.stringify(res.data.token));

      navigate("/");
    } catch (error) {
      setLoginError(true); // 에러 상태 설정
    }
  };

  // loginError 상태가 true일 때 일정 시간 후 false로 변경
  useEffect(() => {
    if (!loginError) return;
    const timer = setTimeout(() => {
      setLoginError(false); // 에러 메시지 숨기기
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [loginError]);

  return (
    <main className="flex items-center justify-center">
      <FormContainer>
        <header className="flex items-center justify-center mt-10 mb-4 ">
          <img src={mascot_nobg} alt="Mascot" className="w-20 h-20" />
        </header>
        <h1 className="mt-5 text-3xl font-bold text-center">{t("로그인")}</h1>

        <section className="mt-10">
          <Input
            label={t("이메일")}
            value={email}
            type="text"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? t("유효한 이메일을 입력해주세요.") : ""}
          />
        </section>
        <section className="mt-5">
          <Input
            label={t("비밀번호")}
            value={password}
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError
                ? t("8~16자의 영문 소문자, 숫자, 특수문자를 사용해 주세요.")
                : ""
            }
          />
        </section>

        {loginError && (
          <Alert severity="error" className="mt-4">
            {t("이메일과 비밀번호를 확인해주세요.")}
          </Alert>
        )}
        <footer className={`${loginError ? "mt-6" : "mt-10"}`}>
          <SubmitButton value={login} size="xl" onClick={handleSubmit} />
        </footer>

        <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-10 ">
          <button onClick={() => navigate("/join")}>{t("회원가입")}</button>
        </div>
      </FormContainer>
      <SelectLanguageButton />
    </main>
  );
}
