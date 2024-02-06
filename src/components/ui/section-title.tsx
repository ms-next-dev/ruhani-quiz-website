import { barlow } from "@/lib/fonts";

interface SectionTitle {
  title: string;
}
const SectionTitle: React.FC<SectionTitle> = ({ title }) => {
  return (
    <>
      <h1
        className={`${barlow.className} text-[30px] md:text-[36px] text-[#212529] font-medium leading-[50px]`}
      >
        {title}
      </h1>
      <div className="h-[4px] w-[95px] bg-main mt-[10px]"></div>
    </>
  );
};

export default SectionTitle;
