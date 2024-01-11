// Packages
import dynamic from "next/dynamic";

// Local Imports
const LoginForm = dynamic(() => import("./components/login-form"));
const PageTransition = dynamic(() => import("@/framer/page-transition"));

const Login = () => {
  return (
    <PageTransition>
      <LoginForm />
    </PageTransition>
  );
};

export default Login;
