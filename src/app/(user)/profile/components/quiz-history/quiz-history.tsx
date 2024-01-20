// Packages
import moment from "moment";

// Local Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    topic: "Namaz",
    marks: 7,
    date: new Date("10-6-2015"),
  },
  {
    id: 2,
    topic: "Namaz",
    marks: 10,
    date: new Date("10-9-2020"),
  },
];

const QuizHistory = () => {
  return (
    <div>
      <div className="pb-3">
        <h3 className="font-semibold text-[18px] px-[10px]">History</h3>
      </div>
      <Card className="rounded-[20px]">
        <CardContent className="p-[20px] ">
          <Table>
            <TableCaption>A list of your quiz history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Topic</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ date, id, marks, topic }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{topic}</TableCell>
                  <TableCell>{marks}/10</TableCell>
                  <TableCell>{moment(date).format("LL")}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="text-[12px] py-1 text-white rounded-[6px] hover:bg-main duration-300 bg-main/90"
                    >
                      Watch
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizHistory;
