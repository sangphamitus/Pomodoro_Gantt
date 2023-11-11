import { TaskStatus } from '../common/enum';

interface Task {
  id: number;
  name: string;
  poromodos: {
    act: number;
    est: number;
  };
  note: string;
  status: TaskStatus;
}

export type { Task };
