import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Question = {
  questionBody: string;
  solutionBody: string;
  textSolution: string;
  initialCode?: string;
  codeSolution: string;
  title: string;
  variant: "code" | "text";
};

export interface QuestionState {
  questions: Question[];
}

const initialState: QuestionState = {
  questions: [],
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
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.questions.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestion, addQuestions, deleteQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
