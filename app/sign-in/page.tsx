import SignInComponent from "@/components/SignInComponent";

export const dynamic = "force-dynamic";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-10">
      <SignInComponent />
    </div>
  );
};

export default SignIn;
