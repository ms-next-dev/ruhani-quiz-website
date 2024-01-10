import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/homePage/banner"));

export default function Home() {
    return (
        <div>
            <Banner />
            <h1 className="flex justify-center items-center my-80 text-2xl lg:text-8xl">
                Welcome to Ruhani Quiz
            </h1>
        </div>
    );
}
