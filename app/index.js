// src/App.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodoCompletion, deleteTodo, loadTodos } from "../services/slice/todoSlice";
import { Provider } from "react-redux";
import { store } from "../services/storge";
import TodoItem from "../componts/todoItem";

const TodoApp = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={() => dispatch(toggleTodoCompletion(item.id))} onDelete={() => dispatch(deleteTodo(item.id))} />
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
