import { useState, useEffect, useMemo } from 'react';
import type { Todo, FilterStatus } from '../types/todo';

const STORAGE_KEY = 'todos_app_data';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      isCompleted: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.isCompleted);
      case 'completed':
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    totalCount: todos.length,
    activeCount: todos.filter((t) => !t.isCompleted).length,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};