import FormContainer from "../../components/Form/FormContainer";
import LoginButton from "../../components/Form/LoginButton";

export default function JoinSuccess() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <FormContainer>
          <div className="flex justify-center items-center mt-20 mb-14">
            <img
              src="./runtime_logo.svg"
              alt="Runtime Logo"
              className="w-36 h-40"
            />
          </div>
          <p className="text-[32px] font-bold text-center">
            가입을 축하합니다!
          </p>
          <p className="text-4 text-center text-[#c5c5c5] mt-4">
            개발자의 성장을 돕는 <span className="font-bold ">런타임</span>{" "}
            가입을 환영합니다!<br></br>
            여러분의 개발 여정을 기록하고, 함께 나누어 보세요
          </p>
          <div className="mt-16 mb-20">
            <LoginButton value="로그인 하기" />
          </div>
        </FormContainer>
      </div>
    </>
  );
}
