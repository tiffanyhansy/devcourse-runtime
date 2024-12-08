import { useState } from "react";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import LoginButton from "../../components/Form/LoginButton";

export default function Login() {
  const login = "로그인";

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

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

  return (
    <main className="flex justify-center items-center px-[50px] w-[1440px] h-[1024px]">
      <FormContainer>
        <header className="flex justify-center items-center mt-14 mb-4">
          <img
            src="./runtime_logo.svg"
            alt="Runtime Logo"
            className="w-24 h-24"
          />
        </header>
        <h1 className="text-3xl  font-bold  text-center">로그인</h1>
        <section className="mt-14">
          <Input
          label="이메일"
            value={email}
            type="text"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "유효한 이메일을 입력해주세요." : ""}
          />
        </section>
        <section className="mt-8">
          <Input
          label="비밀번호"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError
                ? "비밀번호는 8~16자의 영문 대/소문자와 숫자를 포함해야 합니다."
                : ""
            }
          />
        </section>
        <footer className="mt-12">
          <LoginButton value={login} />
        </footer>

        <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-16 ">
          <button>회원가입</button>
        </div>
      </FormContainer>
    </main>
  );
}
