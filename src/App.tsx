import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

export const App: React.FC = () => {
  const {
    todos,
    activeCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Список задач</h1>
        <p className="task-counter">Осталось сделать: {activeCount}</p>
      </header>

      <main className="app-content">
        <TodoInput onAdd={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>
    </div>
  );
};

export default App;