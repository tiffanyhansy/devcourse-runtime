import { useNavigate } from "react-router";
import FormContainer from "../../components/Form/FormContainer";
import SubmitButton from "../../components/Form/SubmitButton";
import mascot_nobg from "../../asset/images/mascot_nobg.svg";

export default function JoinSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <main className="flex items-center justify-center">
        <FormContainer>
          <header className="flex items-center justify-center mt-16 mb-6">
            <img src={mascot_nobg} alt="Runtime Logo" className="w-40 h-40" />
          </header>
          <section>
            <p className="text-3xl font-bold text-center">가입을 축하합니다!</p>
            <p className="text-4 text-center text-[#c5c5c5] mt-4">
            </p>
          </section>
          <footer className="mt-16 mb-16">
            <SubmitButton
              value="로그인 하기"
              onClick={() => navigate("/login")}
              size="xxl"
            />
          </footer>
        </FormContainer>
      </main>
    </>
  );
}
