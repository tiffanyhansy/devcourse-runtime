import { useState } from "react";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import LoginButton from "../../components/Form/LoginButton";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  // 유효성 검사 함수
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);

  const validateName = (name: string) => /^[가-힣a-zA-Z\s]+$/.test(name);

  // 입력값 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailHelperText("유효한 이메일을 입력해주세요.");
      setEmailError(true);
    } else {
      setEmailHelperText("");
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(true);
      setPasswordHelperText(
        "비밀번호는 8~16자의 영문 대소문자와 숫자를 포함해야 합니다."
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
      setCheckPasswordHelperText("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPasswordError(false);
      setCheckPasswordHelperText("");
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    if (!validateName(value)) {
      setUserNameError(true);
      setUserNameHelperText("이름은 한글 또는 영문만 입력 가능합니다.");
    } else {
      setUserNameError(false);
      setUserNameHelperText("");
    }
  };

  // 폼 제출 처리
  const handleSubmit = () => {
    if (
      !emailError &&
      !passwordError &&
      !checkPasswordError &&
      !userNameError &&
      email &&
      password &&
      checkPassword &&
      userName
    ) {
      navigate('/join-success')
    }
  };

  return (
    <main className="flex justify-center items-center ">
      <FormContainer>
        <header className="flex justify-center items-center mt-8 mb-4">
          <img
            src="/src/asset/images/runtime_logo.svg"
            alt="Runtime Logo"
            className="w-14 h-14"
          />
        </header>
        <h1 className="text-3xl font-bold text-center mt-5">회원가입</h1>
        <section className="mt-8">
          <Input
            label="이메일"
            value={email}
            type="text"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailHelperText}
          />
        </section>
        <section className="mt-4">
          <Input
          label="비밀번호"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordHelperText}
          />
        </section>
        <section className="mt-4">
          <Input
          label="비밀번호 확인"
            value={checkPassword}
            type="password"
            onChange={handleCheckPasswordChange}
            error={checkPasswordError}
            helperText={checkPasswordHelperText}
          />
        </section>
        <section className="mt-4">
          <Input
            label="이름"
            value={userName}
            type="text"
            onChange={handleUserNameChange}
            error={userNameError}
            helperText={userNameHelperText}
          />
        </section>
        <footer className="mt-8 mb-12">
          <LoginButton value="회원가입" onClick={handleSubmit} size="xl" />
        </footer>
      </FormContainer>
    </main>
  );
}
