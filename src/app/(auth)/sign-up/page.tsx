// Packages
import dynamic from "next/dynamic";

// Local Imports
const RegistrationForm = dynamic(
  () => import("./components/registration-form")
);

const SignUpPage = () => {
  return (
    <div className="container">
      <RegistrationForm />;
    </div>
  );
};

export default SignUpPage;
