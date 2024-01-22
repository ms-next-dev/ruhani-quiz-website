"use client";

// packages
import { useState } from "react";

// Local Imports
import LottiePlayer from "@/components/ui/lottie-player";
import { QuizQuestion } from "@/types";
import Questions from "./questions";
import Timer from "./timer";

type QuestionPageProps = {
  questions: QuizQuestion[];
  quizId: string;
};

const QuestionPage: React.FC<QuestionPageProps> = ({ questions, quizId }) => {
  const [questionNum, setQuestionNum] = useState<number>(1);

  return (
    <div>
      <p className="text-center text-[16px] md:text-xl text-black mb-8 md:mb-14">
        {questionNum}/{questions?.length} Question
      </p>
      <div>
        <div>
          {/* <Progress
            value={questionNum * 10}
            className="rounded-none h-[10px] bg-[#cccccc]"
          /> */}
        </div>
        <div className="px-4 py-8 md:px-16 md:py-10 bg-white/95 rounded-b-xl shadow-lg grid grid-cols-8 gap-x-10">
          <div className="col-span-8 md:col-span-3">
            <Timer onCompleteA={() => {}} />
            <div className="hidden md:block">
              <LottiePlayer src="https://lottie.host/9e8fec58-3b6e-4176-bd74-591b3208b9a5/uRfqpO0LZ4.json" />
            </div>
          </div>

          {/* Questions */}
          <div className="col-span-8 md:col-span-5 ">
            <>
              <Questions {...{ questions, setQuestionNum, quizId }} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
