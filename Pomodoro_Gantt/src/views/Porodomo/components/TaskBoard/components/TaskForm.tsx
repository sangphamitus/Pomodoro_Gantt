import { SubmitHandler, useForm } from 'react-hook-form';
import { Task } from '../../../../../interfaces';
import { TaskStatus } from '../../../../../common/enum';
import { useAppDispatch, useAppSelector } from '../../../../../configs/hooks';
import { useState } from 'react';
import { appendTask } from '../../../../../redux/pomodoro/pomodoroSlice';

const TaskForm = ({ callbacks, id = undefined }: { callbacks: () => void; id?: number }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.pomodoro);
  const [isHaveNote, setIsHaveNote] = useState(id ? tasks[id].note.length > 0 : false);
  const defaultValues = id
    ? tasks[id]
    : {
        status: TaskStatus.notDone,
        name: '',
        note: '',
        poromodos: {
          act: 0,
          est: 1,
        },
        id: Object.keys(tasks).length + 1,
      };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<Task> = (data) => {
    dispatch(appendTask(data));
    setIsHaveNote(false);
    callbacks();
  };
  return (
    <div className="bg-neutral-focus first-line border-2 rounded-md p-2 border-dashed border-neutral-50">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <fieldset className="w-full ">
          <input
            {...register('name', { required: true })}
            aria-invalid={errors.name ? 'true' : 'false'}
            placeholder="What are you working on ?"
            className="input  input-ghost w-full rounded-sm p-0 input-lg text-lg"
          />
        </fieldset>
        <fieldset className="w-full flex flex-col gap-1">
          <label>Est Pomodoros</label>
          <div className="flex justify-around ">
            <input
              type="number"
              {...register('poromodos.est', { required: true })}
              aria-invalid={errors.poromodos?.est ? 'true' : 'false'}
              className="input input-ghost input-xs rounded-sm input-sm"
            />
            <div className="flex gap-2">
              {' '}
              <button
                type="button"
                onClick={() => {
                  setValue('poromodos.est', parseInt(getValues('poromodos.est').toString()) + 1);
                }}
                className="btn btn-sm btn-secondary"
              >
                &uarr;
              </button>
              <button
                type="button"
                onClick={() => {
                  if (getValues('poromodos.est') > 0)
                    setValue('poromodos.est', parseInt(getValues('poromodos.est').toString()) - 1);
                }}
                className="btn btn-sm btn-secondary"
              >
                &darr;
              </button>
            </div>
          </div>
        </fieldset>
        {isHaveNote ? (
          <textarea
            placeholder="Note some thing here..."
            {...register('note')}
            className="textarea textarea-bordered textarea-sm w-full rounded-sm p-0"
          ></textarea>
        ) : (
          <a onClick={() => setIsHaveNote(true)} className="text-sm text-neutral-content link">
            + Add note
          </a>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setIsHaveNote(false);
              callbacks();
            }}
            className="btn-neutral btn-outline btn btn-sm"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary btn-active btn btn-sm">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
