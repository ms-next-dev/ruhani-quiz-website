import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div>
      <h1
        className={cn(
          " text-[24px] md:text-[44px] leading-tight font-semibold lg:w-4/6 ",
          titleClassName
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "text-[14px] md:text-[16px] font-light",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;
