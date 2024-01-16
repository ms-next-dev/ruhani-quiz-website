import { montserrat } from "@/lib/fonts";

interface PageBannerProps {
    bannerImg: string | undefined;
    title1: string;
    title2: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
    bannerImg,
    title1,
    title2,
}) => {
    return (
        <div>
            <div
                className="h-[30vh] md:h-[40vh] lg:h-[50vh]"
                style={{
                    background: `url(${bannerImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            ></div>
            <div className="flex justify-center">
                <div
                    className={`${montserrat.className} text-center text-[#FF004C] bg-black/40 py-6 md:py-14 xl:py-16 px-4 md:px-16 xl:px-28 tracking-wider rounded-[25px_0px] shadow-[3.134px_3.134px_18.804px_3.134px_rgba(0,0,0,0.50)] -mt-16 md:-mt-28 xl:-mt-36 mb-8 lg:mb-12`}
                >
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold uppercase">
                        {title1}
                    </h1>
                    <h3 className="text-lg md:text-3xl xl:text-5xl mt-2 md:mt-4 lg:mt-6 xl:mt-8 font-medium text-white capitalize">
                        {title2}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PageBanner;
