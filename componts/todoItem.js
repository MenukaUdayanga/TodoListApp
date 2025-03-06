import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TodoItem = ({ item, onToggle, onDelete }) => {
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        {item.completed && <Ionicons name="checkmark" size={20} color="white" />}
      </TouchableOpacity>
      <Text style={[styles.todoText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: "center", justifyContent: "center", marginRight: 10, backgroundColor: "#4CAF50" },
  todoText: { flex: 1, fontSize: 18 },
  completedText: { textDecorationLine: "line-through", color: "gray" },
});

export default TodoItem;
