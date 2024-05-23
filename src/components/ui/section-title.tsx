import { montserrat } from "@/lib/fonts";

interface SectionTitle {
  title: string;
  varient?: "dark" | "light";
}
const SectionTitle: React.FC<SectionTitle> = ({ title, varient }) => {
  return (
    <>
      <h1
        className={`${montserrat.className} text-[30px] md:text-[36px] text-[#212529] font-medium leading-[50px]`}
      >
        {title}
      </h1>
      <div className="h-[4px] w-[95px] bg-main mt-[10px]"></div>
    </>
  );
};

export default SectionTitle;
