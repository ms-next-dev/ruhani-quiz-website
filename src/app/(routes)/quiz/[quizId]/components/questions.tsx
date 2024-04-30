"use client";

// packages
import { Dispatch, SetStateAction, useState } from "react";

// local imports
import { QuizQuestion } from "@/types";

type QuestionProps = {
  isLoading: boolean;
  selectedOptIndex: number | null;
  setSelectedOptIndex: Dispatch<SetStateAction<number | null>>;
  currentQuestion: QuizQuestion;
  nextQuestion: () => void;
};

const Questions: React.FC<QuestionProps> = ({
  isLoading,
  selectedOptIndex,
  setSelectedOptIndex,
  currentQuestion,
  nextQuestion,
}) => {
  const [error, setError] = useState<true | false>(false);

  return (
    <div className="pt-6">
      <h1
        className={`text-[20px] md:text-[25px] lg:text-[30px] font-semibold mb-12`}
      >
        {currentQuestion?.question}
      </h1>
      <div className="space-y-5 w-full">
        {currentQuestion?.options.map((option, i) => (
          <div
            key={option}
            className="flex justify-start items-center gap-x-3 group"
            onClick={() => {
              setSelectedOptIndex(i);
              setError(false);
            }}
          >
            <div
              className={`${
                selectedOptIndex === i
                  ? "bg-[#FF004C] text-white"
                  : "bg-[#cccccc]"
              } py-2 px-4 md:py-4 md:px-6 text-[15px] md:text-xl font-medium rounded-md   duration-300 cursor-pointer`}
            >
              {i === 0 && "A"} {i === 1 && "B"} {i === 2 && "C"}{" "}
              {i === 3 && "D"}
            </div>
            <div
              className={`${
                selectedOptIndex === i
                  ? "bg-[#FF004C] text-white"
                  : "bg-[#cccccc]"
              } py-2 px-4 md:py-4 md:px-6 text-[16px] md:text-lg font-normal  rounded-lg w-full group-hover:bg-main  duration-300 group-hover:text-white cursor-pointer`}
            >
              {option}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-x-5 mt-6">
        {error && (
          <p className="text-base text-red-500">** Please select an answer</p>
        )}
        <button
          onClick={nextQuestion}
          disabled={isLoading}
          className="py-2 md:py-4 w-32 md:w-44 text-[16px] md:text-lg font-medium bg-[#cccccc] rounded-md disabled:bg-slate-200 disabled:text-slate-400 hover:bg-[#ff004c] hover:text-white duration-300 text-center flex justify-center "
        >
          <span>Next Question</span>
        </button>
      </div>
    </div>
  );
};

export default Questions;
