import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Footer = () => {
    return (
        <div>
            <div
                className={`${poppins.className}`}
                style={{
                    background: `url(${"/footer-img.png"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="flex justify-between items-end bg-[linear-gradient(82deg,rgba(20,18,18,0.98)52.89%,rgba(4,2,2,0.64)98.38%)] p-36 text-white">
                    <div>
                        <div>
                            <h3
                                className={`${inter.className} text-[#FF004C] font-bold mb-10`}
                            >
                                Contact Us
                            </h3>
                            <p>+880 1234 4567</p>
                            <p>+880 1234 4567</p>
                            <p className="mt-3">info.ruhaniquiz@gmail.com</p>
                        </div>
                        <div>
                            <h3
                                className={`${inter.className} text-[#FF004C] font-bold my-10`}
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
                                    />
                                </Link>
                                <Link href={"/"}>
                                    <Image
                                        alt="social-icon"
                                        src={"/instagram.svg"}
                                        width={40}
                                        height={40}
                                    />
                                </Link>
                                <Link href={"/"}>
                                    <Image
                                        alt="social-icon"
                                        src={"/snapchat.svg"}
                                        width={40}
                                        height={40}
                                    />
                                </Link>
                                <Link href={"/"}>
                                    <Image
                                        alt="social-icon"
                                        src={"/facebook.svg"}
                                        width={40}
                                        height={40}
                                        className="mb-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col font-bold gap-y-3">
                            <h3
                                className={`${inter.className} text-[#FF004C] mb-7`}
                            >
                                Quick Links
                            </h3>
                            <Link href={"/"}>Topics</Link>
                            <Link href={"/"}>About Us</Link>
                            <Link href={"/"}>Contact</Link>
                            <Link href={"/"}>Our Team</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3
                            className={`${inter.className} text-[#FF004C] font-bold mb-10`}
                        >
                            Get In Touch
                        </h3>

                        <div className="w-full">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                                className="w-full rounded-[30px] bg-white text-[#737373] h-[60px] px-8 mb-3"
                            />
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Phone Number"
                                className="w-full rounded-[30px] bg-white text-[#737373] h-[60px] px-8 mb-2"
                            />
                        </div>

                        <p className="text-[10px] text-[#FF004C] whitespace-nowrap mb-7">
                            * For Communication Purpose Only. We will never
                            share your phone number with anyone!
                        </p>

                        <button className="text-white text-center w-full bg-[#FF004C] rounded-[30px] h-[60px] font-semibold">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
