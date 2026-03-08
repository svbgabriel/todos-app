export interface TodoType {
  id: string;
  text: string;
  active: boolean;
}

export type FilterType = 'all' | 'done' | 'pending';
