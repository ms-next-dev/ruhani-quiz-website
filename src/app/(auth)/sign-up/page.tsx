// Packages
import dynamic from "next/dynamic";

// Local Imports
const RegistrationForm = dynamic(
  () => import("./components/registration-form")
);
const PageTransition = dynamic(() => import("@/framer/page-transition"));

const SignUpPage = () => {
  return (
    <PageTransition>
      <RegistrationForm />;
    </PageTransition>
  );
};

export default SignUpPage;
