import { memo, useState } from 'react';
import { TaskStatus } from '../../../../../common/enum';
import { useAppDispatch, useAppSelector } from '../../../../../configs/hooks';
import { setTaskAttribute } from '../../../../../redux/pomodoro/pomodoroSlice';
import { FiMoreVertical } from 'react-icons/fi';
import TaskForm from './TaskForm';
const TaskRows = memo(({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.pomodoro);
  const task = tasks[id];
  if (!task) return <></>;

  const [isExpanded, setIsExpanded] = useState(false);
  const onCheckHandler = (_e: any) => {
    dispatch(
      setTaskAttribute({
        id,
        value: { status: task.status === TaskStatus.notDone ? TaskStatus.done : TaskStatus.notDone },
      })
    );
    if (isExpanded) setIsExpanded(false);
  };

  return !isExpanded ? (
    <div className="border-2 border-neutral-content rounded-md p-2 my-2 bg-neutral">
      <div className="flex w-full text-center gap-1 justify-between my-2">
        <div className="flex gap-1 align-middle">
          <div>
            <input
              type="checkbox"
              checked={task?.status === TaskStatus.done}
              className="checkbox checkbox-success checkbox-md rounded-full"
              onChange={onCheckHandler}
            />
          </div>
          <p className={`text-center truncate max-w-3xl ${task.status === TaskStatus.done && 'line-through'}`}>
            {task.name}{' '}
          </p>
        </div>
        <div className="flex gap-3 text-center align-middle">
          <div className="text-base-content text-center">
            {task.poromodos.act}/{task.poromodos.est}
          </div>
          <button
            className="btn btn-square btn-outline btn-sm"
            onClick={() => {
              setIsExpanded(true);
            }}
          >
            <FiMoreVertical />
          </button>
        </div>
      </div>
      {task.note.length > 0 && (
        <div className="flex-wrap bg-warning text-warning-content p-1 rounded-md">{task.note}</div>
      )}
    </div>
  ) : (
    <TaskForm
      id={id}
      callbacks={() => {
        setIsExpanded(false);
      }}
    />
  );
});

export default TaskRows;
