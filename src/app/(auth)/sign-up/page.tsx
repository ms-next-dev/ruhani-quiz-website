// Packages
import AuthUIWrapper from "@/components/auth/auth-ui-wrapper";
import dynamic from "next/dynamic";

// Local Imports
const RegistrationForm = dynamic(
  () => import("./components/registration-form")
);
const PageTransition = dynamic(() => import("@/framer/page-transition"));

const SignUpPage = () => {
  return (
    <AuthUIWrapper>
      <PageTransition>
        <RegistrationForm />;
      </PageTransition>
    </AuthUIWrapper>
  );
};

export default SignUpPage;
