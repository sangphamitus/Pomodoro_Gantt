import { useState } from 'react';
import { TaskStatus } from '../../../../common/enum';
import { useAppSelector } from '../../../../configs/hooks';
import TaskForm from './components/TaskForm';
import TaskRows from './components/TaskRows';

const TaskBoard = () => {
  const { tasks } = useAppSelector((state) => state.pomodoro);
  const [isAdding, setIsAdding] = useState(false);
  const sortedTasks = Object.keys(tasks).sort((_a: string, _b: string) => {
    const a = parseInt(_a);
    const b = parseInt(_b);
    return tasks[a]?.status === tasks[b]?.status ? 0 : tasks[a]?.status === TaskStatus.notDone ? -1 : 1;
  });
  return (
    <div>
      <div>
        {sortedTasks.map((_key: string) => {
          return <TaskRows key={_key} id={parseInt(_key)} />;
        })}
      </div>
      {isAdding ? (
        <TaskForm callbacks={() => setIsAdding(false)} />
      ) : (
        <div
          className="cursor-pointer border-2 rounded-md p-2 border-dashed border-neutral-50 w-full"
          onClick={() => setIsAdding(true)}
        >
          Add more
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
