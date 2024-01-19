import { montserrat } from "@/lib/fonts";

interface SectionTitle {
  title: string;
}
const SectionTitle: React.FC<SectionTitle> = ({ title }) => {
  return (
    <>
      <h1
        className={`${montserrat.className} text-[30px] md:text-[38px] text-[#292D33] font-semibold leading-[56px]`}
      >
        {title}
      </h1>
      <div className="h-[4px] w-[95px] bg-main mt-[15px]"></div>
    </>
  );
};

export default SectionTitle;
