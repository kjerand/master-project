import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";
export type Question = {
  questionBody: EditorState;
  solutionBody: EditorState;
  solution: string;
  initialCode?: string;
  codeSolution: string;
  title: string;
  variant: "code" | "text";
};

export interface QuestionState {
  questions: Question[];
}

const initialState: QuestionState = {
  questions: [
    {
      questionBody: EditorState.createEmpty(),
      solutionBody: EditorState.createEmpty(),
      solution: "",
      codeSolution: "",
      title: "Empty question",
      variant: "code",
    },
  ],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.unshift(action.payload);
    },
    addQuestions: (state, action: PayloadAction<Question[]>) => {
      for (let q of action.payload) {
        state.questions.unshift(q);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestion, addQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
