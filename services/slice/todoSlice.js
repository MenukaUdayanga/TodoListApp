// src/redux/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "todos";

// Load todos from AsyncStorage
export const loadTodos = createAsyncThunk("todos/load", async () => {
  const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
});

// Save todos to AsyncStorage
const saveTodosToStorage = async (todos) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Create slice
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodos = [...state, { id: Date.now(), text: action.payload, completed: false }];
      saveTodosToStorage(newTodos);
      return newTodos;
    },
    toggleTodoCompletion: (state, action) => {
      const newTodos = state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToStorage(newTodos);
      return newTodos;
    },
    deleteTodo: (state, action) => {
      const newTodos = state.filter((todo) => todo.id !== action.payload);
      saveTodosToStorage(newTodos);
      return newTodos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTodo, toggleTodoCompletion, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
