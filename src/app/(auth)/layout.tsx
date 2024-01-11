import WidthAnimation from "@/framer/widthAnimation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-110px)] ">
      <div>
        <WidthAnimation>
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0 min-h-[480px]">
            {/* <!-- left side --> */}
            <div>
              <img
                src="/promo1.jpg"
                alt="img"
                className="w-[500px] h-full hidden rounded-l-2xl md:block object-cover"
              />
            </div>
            {/* <!-- right side --> */}
            <div>{children}</div>
          </div>
        </WidthAnimation>
      </div>
    </div>
  );
}
