import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/axios";
import { Alert } from "@mui/material";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import runtime_logo from "/src/asset/images/runtime_logo.svg"

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
      setEmailHelperText("유효한 이메일을 입력해주세요.");
      setEmailError(true);
    } else {
      const isAvailable = await checkEmailAvailability(value);
      if (!isAvailable) {
        setEmailHelperText("이미 사용 중인 이메일입니다.");
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
        "8~16자의 영문 소문자, 숫자, 특수문자를 사용해 주세요"
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
        "아이디는 영문 소문자 또는 숫자만 입력 가능합니다."
      );
    } else {
      const isAvailable = await checkUsernameAvailability(value);
      if (!isAvailable) {
        setUserNameError(true);
        setUserNameHelperText("이미 사용 중인 아이디입니다.");
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

  useEffect(() => {
    if (!joinError) return;
    const timer = setTimeout(() => {
      setJoinError(false); // 에러 메시지 숨기기
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [joinError]);

  return (
    <main className="flex justify-center items-center">
      <FormContainer>
        <header className="flex justify-center items-center mt-8 mb-4">
          <img
            src={runtime_logo}
            alt="Runtime Logo"
            className="w-14 h-14"
          />
        </header>
        <h1 className="text-2xl font-bold text-center mt-5">회원가입</h1>
        <section className="mt-7">
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
            label="아이디"
            value={userName}
            type="text"
            onChange={handleUserNameChange}
            error={userNameError}
            helperText={userNameHelperText}
          />
        </section>
        {joinError && (
          <Alert severity="error" className="mt-4">
            입력한 정보를 다시 확인해주세요.
          </Alert>
        )}
        <footer className={`${joinError ? "mt-5" : "mt-8"} `}>
          <SubmitButton value="회원가입" onClick={handleSubmit} size="xl" />
        </footer>

        <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-10 ">
          <button onClick={() => navigate("/login")}>로그인</button>
        </div>
      </FormContainer>
    </main>
  );
}
