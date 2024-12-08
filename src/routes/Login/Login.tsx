import { useState } from "react";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import LoginButton from "../../components/Form/LoginButton";

export default function Login() {
  const email = "이메일";
  const password = "비밀번호";
  const login = "로그인";

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <FormContainer>
          <div className="flex justify-center items-center mt-14 mb-4">
            <img
              src="./runtime_logo.svg"
              alt="Runtime Logo"
              className="w-24 h-[109px]"
            />
          </div>
          <p className="text-[32px] font-bold  text-center">로그인</p>
          <div className="mt-14">
            <Input value={email} type="text" />
          </div>
          <div className="mt-8">
            <Input value={password} type="password" />
          </div>
          <div className="mt-12">
            <LoginButton value={login} />
          </div>

          <div className="flex justify-center items-center text-[#7EACB5] mt-5 mb-16 ">
            <button>회원가입</button>
          </div>
        </FormContainer>
      </div>
    </>
  );
}
