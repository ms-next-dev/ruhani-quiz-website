// Packages
import { User } from "@prisma/client";
import Image from "next/image";

// Local Imports
import { Card, CardContent } from "@/components/ui/card";

interface QuizReportSummaryProps {
  user: User;
}

const QuizReportSummary: React.FC<QuizReportSummaryProps> = ({ user }) => {
  // Dynamic css of circle > progress-bar css located on globals.css
  const progressBarStyle = {
    "--progress": `${62.8}%`,
    height: "120px",
    width: "120px",
    borderRadius: "50%",
  } as React.CSSProperties;

  interface dataType {
    id: number;
    title: string;
    value: string;
  }

  const data: dataType[] = [
    {
      id: 1,
      title: "Total Quizes",
      value: "1k",
    },
    {
      id: 2,
      title: "Answered",
      value: "897/1200",
    },
    {
      id: 3,
      title: "Total Marks",
      value: "12500",
    },
  ];
  return (
    <div>
      <div className="pb-3">
        <h3 className="font-semibold text-[18px] px-[10px]">Quiz Report</h3>
      </div>
      <Card className="h-[226px] rounded-[20px]">
        <CardContent className="p-[20px] flex justify-between items-center h-full">
          <div className="flex-1 flex flex-col gap-y-2">
            {data.map(({ id, title, value }) => (
              <div className="flex items-center gap-x-2 h-full " key={id}>
                <Image
                  src="/handArrow.svg"
                  alt="arrow"
                  height={15}
                  width={15}
                />
                <div className="text-1 text-xs md:text-sm">
                  {title} - <span className="font-semibold">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              className="progress-bar flex justify-center flex-col items-center"
              role="progressbar"
              style={progressBarStyle}
              aria-valuenow={40}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="text-[20px] font-semibold">{62.8}%</span>
              <span className="text-[14px]">Average</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizReportSummary;
