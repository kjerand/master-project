import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { Question } from "../../app/questions";
import { RootState } from "../../app/store";
import Header from "../base/Header";

const DisplayQuestion = ({
  questions,
  taskIndex,
  setTaskIndex,
}: {
  questions: Question[];
  taskIndex: number;
  setTaskIndex: Function;
}) => {
  return (
    <>
      {questions.length > 0 && (
        <>
          <h1 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-700 mt-10">
            Choose question
          </h1>
          <div className="flex">
            {Array.from(Array(questions.length)).map((v, index) => {
              return (
                <p
                  key={v}
                  onClick={() => setTaskIndex(index)}
                  className="hover:text-gray-600 text-blue-600 px-1 cursor-pointer"
                >
                  {index + 1}
                </p>
              );
            })}
          </div>

          <Editor
            toolbar={{
              options: [],
            }}
            editorState={questions[taskIndex].questionBody}
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </>
      )}
    </>
  );
};

export default DisplayQuestion;
