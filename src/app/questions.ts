import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

export interface QuestionState {
  questions: EditorState[];
}

const initialState: QuestionState = {
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<EditorState>) => {
      state.questions.push(action.payload);
    },
    addQuestions: (state, action: PayloadAction<EditorState[]>) => {
      for (let q of action.payload) {
        state.questions.push(q);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestion, addQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
