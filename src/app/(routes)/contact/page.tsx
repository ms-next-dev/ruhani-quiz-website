import { Button } from "@/components/ui/button";
import { hindSiliguri } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
    return (
        <div>
            <div className="container">
                <Image
                    alt=""
                    src="/bg/contact.png"
                    width={1440}
                    height={726}
                    className="mx-auto"
                />

                <div className="flex justify-center">
                    <div
                        className={`${hindSiliguri.className} text-center text-[#FF004C] bg-white/95 py-4 md:py-6 lg:py-8 xl:py-10 px-4 md:px-16 lg:px-16 xl:px-28 tracking-wider rounded-[5px] shadow-lg -mt-10 md:-mt-14 lg:-mt-20 mb-8 lg:mb-12`}
                    >
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold capitalize">
                            Contact Us
                        </h1>
                        <h3 className="text-[12px] md:text-lg lg:text-2xl mt-0 md:mt-1 lg:mt-2 xl:mt-4 font-medium capitalize">
                            Let us know about any of your queries
                        </h3>
                    </div>
                </div>

                <div className="relative">
                    <div
                        className="rounded-3xl mb-12 md:mb-16 lg:mb-28"
                        style={{
                            background: `url(${"/bg/contact-form-bg-2.jpg"})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="bg-black/10 py-12 md:py-20 lg:py-48 pl-2 md:pl-20 pr-2 md:pr-20 lg:pl-[456px] lg:pr-[116px] rounded-3xl">
                            <h3
                                className={`${hindSiliguri.className} text-2xl lg:text-[40px] text-white text-center font-semibold lg:font-bold mb-12 lg:mb-20`}
                            >
                                Get In Touch
                            </h3>

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Your Name"
                                    className="w-full rounded-[30px] bg-white text-[#737373] h-12 md:h-[60px] px-4 md:px-8 mb-3"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Your email"
                                    className="w-full rounded-[30px] bg-white text-[#737373] h-12 md:h-[60px] px-4 md:px-8 mb-3"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone Number"
                                    className="w-full rounded-[30px] bg-white text-[#737373] h-12 md:h-[60px] px-4 md:px-8 mb-2"
                                />
                            </div>

                            <p className="text-[10px] text-[#FF004C] md:whitespace-nowrap mb-7">
                                * For Communication Purpose Only. We will never
                                share your phone number with anyone!
                            </p>

                            <Button
                                variant="primary"
                                className="text-lg text-center w-full rounded-[30px] h-12 md:h-[60px] duration-300"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>

                    <div
                        className="absolute hidden lg:block top-28 py-36 px-16 -left-20"
                        style={{
                            background: `url(${"/bg/contact-form-bg-1.png"})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="text-white">
                            <div>
                                {/* Basic contact */}
                                <h3
                                    className={`${hindSiliguri.className} font-bold mb-4 md:mb-10`}
                                >
                                    Contact Us
                                </h3>
                                <p>+880 1234 4567</p>
                                <p>+880 1234 4567</p>
                                <p className="mt-3">
                                    info.ruhaniquiz@gmail.com
                                </p>
                            </div>
                            <div>
                                {/* Social links */}
                                <h3
                                    className={`${hindSiliguri.className} font-bold mt-10 mb-4 md:mb-10`}
                                >
                                    Let&apos;s Get Social!
                                </h3>
                                <div className="flex justify-start items-center gap-x-8">
                                    <Link href={"/"}>
                                        <Image
                                            alt="social-icon"
                                            src={"/twitter.svg"}
                                            width={36}
                                            height={33}
                                            style={{
                                                height: "auto",
                                                width: "auto",
                                            }}
                                        />
                                    </Link>
                                    <Link href={"/"}>
                                        <Image
                                            alt="social-icon"
                                            src={"/instagram.svg"}
                                            width={40}
                                            height={40}
                                            style={{
                                                height: "auto",
                                                width: "auto",
                                            }}
                                        />
                                    </Link>
                                    <Link href={"/"}>
                                        <Image
                                            alt="social-icon"
                                            src={"/snapchat.svg"}
                                            width={40}
                                            height={40}
                                            style={{
                                                height: "auto",
                                                width: "auto",
                                            }}
                                        />
                                    </Link>
                                    <Link href={"/"}>
                                        <Image
                                            alt="social-icon"
                                            src={"/facebook.svg"}
                                            width={40}
                                            height={40}
                                            className="mb-1"
                                            style={{
                                                height: "auto",
                                                width: "auto",
                                            }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
