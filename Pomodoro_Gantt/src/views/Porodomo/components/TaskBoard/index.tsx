import { useMemo, useState } from 'react';
import { TaskStatus } from '../../../../common/enum';
import { useAppDispatch, useAppSelector } from '../../../../configs/hooks';
import TaskForm from './components/TaskForm';
import TaskRows from './components/TaskRows';
import { FiMoreVertical } from 'react-icons/fi';
import { BsCheckLg, BsFillTrashFill } from 'react-icons/bs';
import { clearAllActPomo, clearAllFinished } from '../../../../redux/pomodoro/thunks';

interface MenuContent {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

const TaskBoard = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.pomodoro);
  const [isAdding, setIsAdding] = useState(false);
  const sortedTasks = Object.keys(tasks).sort((_a: string, _b: string) => {
    const a = parseInt(_a);
    const b = parseInt(_b);
    return tasks[a]?.status === tasks[b]?.status ? 0 : tasks[a]?.status === TaskStatus.notDone ? -1 : 1;
  });

  const leftMenuContents: MenuContent[] = useMemo(() => {
    return [
      {
        title: 'Clear finished task',
        icon: <BsFillTrashFill />,
        onClick: () => dispatch(clearAllFinished()),
      },
      {
        title: 'Clear act pomodoro',
        icon: <BsCheckLg />,
        onClick: () => dispatch(clearAllActPomo()),
      },
    ];
  }, []);

  return (
    <div>
      <div className="flex justify-between text-center items-center">
        {' '}
        <h2>Tasks</h2>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1 btn-sm p-2">
            <FiMoreVertical />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {leftMenuContents.map((content: MenuContent) => {
              return (
                <li key={content.title}>
                  <a onClick={content.onClick}>
                    <div className="flex justify-between gap-2 items-center">
                      <div>{content.icon}</div>
                      <div>{content.title}</div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="divider m-0"></div>
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
