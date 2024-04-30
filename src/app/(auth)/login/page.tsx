// Packages
import AuthUIWrapper from "@/components/auth/auth-ui-wrapper";
import dynamic from "next/dynamic";

// Local Imports
const LoginForm = dynamic(() => import("./components/login-form"));
const PageTransition = dynamic(() => import("@/framer/page-transition"));

const Login = () => {
  return (
    <AuthUIWrapper>
      <PageTransition>
        <LoginForm />
      </PageTransition>
    </AuthUIWrapper>
  );
};

export default Login;
