export const FilterStatus = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type FilterStatus = (typeof FilterStatus)[keyof typeof FilterStatus];

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: number;
}