import Image from "next/image";

interface AuthUIWrapperProps {
  children: React.ReactNode;
}

const AuthUIWrapper: React.FC<AuthUIWrapperProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-110px)] ">
      <div>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0 min-h-[530px] ">
          {/* <!-- left side --> */}
          <div>
            <Image
              src="/promo1.jpg"
              alt="img"
              width={300}
              height={1000}
              className="w-[500px] h-full hidden rounded-l-2xl md:block object-cover"
            />
          </div>
          {/* <!-- right side --> */}
          <div className="relative w-fit">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthUIWrapper;
