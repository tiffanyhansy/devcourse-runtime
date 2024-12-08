import React from "react";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import LoginButton from "../../components/Form/LoginButton";

export default function Join() {
  const email = "이메일";
  const password = "비밀번호";
  const Join = "회원가입";

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
          <p className="text-[32px] font-bold  text-center">{Join}</p>
          <div className="mt-14">
            <Input value={email} type="text" />
          </div>
          <div className="mt-6">
            <Input value={password} type="password" />
          </div>
          <div className="mt-6">
            <Input value="비밀번호 확인" type="password" />
          </div>
          <div className="mt-6">
            <Input value="이름" type="text" />
          </div>
          <div className="mt-12 mb-[72px] ">
            <LoginButton value={Join} />
          </div>
        </FormContainer>
      </div>
    </>
  );
}
