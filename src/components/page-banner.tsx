import { hindSiliguriEnglish } from "@/lib/fonts";

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
                    className={`${hindSiliguriEnglish.className} text-center text-[#FF004C] bg-white/95 py-4 md:py-6 lg:py-8 xl:py-10 px-4 md:px-16 lg:px-16 xl:px-28 tracking-wider rounded-[25px_0px] shadow-lg -mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24 mb-8 lg:mb-12`}
                >
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold capitalize">
                        {title1}
                    </h1>
                    <h3 className="text-lg md:text-2xl lg:text-3xl mt-0 md:mt-1 lg:mt-2 xl:mt-4 font-medium capitalize">
                        {title2}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PageBanner;
