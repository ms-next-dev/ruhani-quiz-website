export interface QuizQuestion {
  _id: string;
  question: string;
  correct_answer: number[];
  options: string[];
  explanation: string;
}
