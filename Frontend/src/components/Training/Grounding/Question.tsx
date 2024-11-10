import { ReactNode } from 'react';

interface QuestionProps {
  question: string;
  answer: ReactNode;
}

export default function Question({ question, answer }: QuestionProps) {
  const questionLines = question.split(',').map((line, index) => (
    <span key={index}>
      {line.trim()}
      <br />
    </span>
  ));

  return (
    <div>
      <span className="font-hakgyoansimR text-3xl text-center">{questionLines}</span>
      <div className="flex flex-col items-center mt-10">
        <div className="py-12 w-64 h-64 items-center border-[12px] border-[#9AD27D] bg-white rounded-full" />
        <div className="absolute z-10 mt-10">{answer}</div>
      </div>
    </div>
  );
}