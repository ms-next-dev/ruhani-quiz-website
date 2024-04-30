import { barlow } from "@/lib/fonts";

interface SectionTitle {
  title: string;
  varient?: "dark" | "light";
}
const SectionTitle: React.FC<SectionTitle> = ({ title, varient }) => {
  return (
    <>
      <h1
        className={`${barlow.className} text-[30px] md:text-[36px] ${
          varient === "dark" ? "text-white" : ""
        } font-medium leading-[50px]`}
      >
        {title}
      </h1>
      <div className="h-[4px] w-[95px] bg-main mt-[10px]"></div>
    </>
  );
};

export default SectionTitle;
