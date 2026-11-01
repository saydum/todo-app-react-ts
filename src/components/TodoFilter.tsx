import React from 'react';
import { FilterStatus } from '../types/todo';
import { FILTER_LABELS } from '../constants/filter';

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      {(Object.keys(FILTER_LABELS) as FilterStatus[]).map((status) => (
        <button
          key={status}
          className={`filter-button ${currentFilter === status ? 'active' : ''}`}
          onClick={() => onFilterChange(status)}
        >
          {FILTER_LABELS[status]}
        </button>
      ))}
    </div>
  );
};