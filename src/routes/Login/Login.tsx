import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";

export default function Login() {
  const login = "로그인";

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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
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

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError(true); // 이메일 또는 비밀번호가 비어 있을 경우 에러 표시
      return;
    }

    if (emailError || passwordError) {
      setLoginError(true); // 유효성 검사가 실패한 경우 에러 표시
      return;
    }

    // 유효성 검사가 통과되었을 경우 페이지 이동
    navigate("/");
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
    <main className="flex justify-center items-center">
      <FormContainer>
        <header className="flex justify-center items-center mt-10 mb-4">
          <img
            src="/src/asset/images/runtime_logo.svg"
            alt="Runtime Logo"
            className="w-16 h-16"
          />
        </header>
        <h1 className="text-3xl  font-bold  text-center mt-7">로그인</h1>

        <section className="mt-10">
          <Input
            label="이메일"
            value={email}
            type="text"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "유효한 이메일을 입력해주세요." : ""}
          />
        </section>
        <section className="mt-5">
          <Input
            label="비밀번호"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError
                ? "비밀번호는 8~16자의 영문 대소문자와 숫자를 포함해야 합니다."
                : ""
            }
          />
        </section>

        {loginError && (
          <Alert severity="error" className="mt-4">
            이메일과 비밀번호를 확인해주세요.
          </Alert>
        )}
        <footer className={`${loginError ? "mt-6" : "mt-10"}`}>
          <SubmitButton value={login} size="xl" onClick={handleSubmit} />
        </footer>

        <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-10 ">
          <button onClick={() => navigate("/join")}>회원가입</button>
        </div>
      </FormContainer>
    </main>
  );
}
