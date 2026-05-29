import SignUpComponent from "@/components/SignUpComponent";

export const dynamic = "force-dynamic";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-10">
      <SignUpComponent />
    </div>
  );
};

export default SignUp;
