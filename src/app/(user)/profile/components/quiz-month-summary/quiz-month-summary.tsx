import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const QuizMonthSummary = () => {
  const data = [
    {
      id: 1,
      played: true,
    },
    {
      id: 2,
      played: true,
    },
    {
      id: 3,
      played: false,
    },
    {
      id: 4,
      played: true,
    },
    {
      id: 5,
      played: true,
    },
    {
      id: 6,
      played: true,
    },
    {
      id: 7,
      played: false,
    },
    {
      id: 8,
      played: true,
    },
    {
      id: 9,
      played: true,
    },
    {
      id: 10,
      played: true,
    },
    {
      id: 11,
      played: false,
    },
    {
      id: 12,
      played: true,
    },
  ];
  return (
    <div className="">
      <div className="pb-3">
        <h3 className="font-semibold text-[18px] px-[10px]">Highlight</h3>
      </div>
      <Card className="h-[226px] rounded-[20px]">
        <CardContent className="p-[20px]">
          <ScrollArea>
            <div className="grid grid-cols-10 gap-6 ">
              {data.map(({ id, played }) => (
                <div
                  key={id}
                  className={cn(
                    " border  h-5 w-5 rounded-[0.25rem]",
                    played
                      ? "bg-green-200 border-green-300"
                      : "border-red-200 bg-red-100"
                  )}
                ></div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizMonthSummary;
