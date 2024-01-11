// Packages
import dynamic from "next/dynamic";

// Local Imports
const LoginForm = dynamic(() => import("./components/login-form"));

const Login = () => {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default Login;
