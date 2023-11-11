import { SubmitHandler, useForm } from 'react-hook-form';
import { AppTheme, PomodoroMode } from '../../common/enum';
import { useAppDispatch, useAppSelector } from '../../configs/hooks';
import { setTheme } from '../../redux/general/generalSlice';
import { PomodoroSettings, setPomodoroSettings } from '../../redux/pomodoro/pomodoroSlice';

type Inputs = {
  theme: AppTheme;
  pomodoroSettings: PomodoroSettings;
};

const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.general);
  const { settings } = useAppSelector((state) => state.pomodoro);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      theme: theme,
      pomodoroSettings: settings,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { theme, pomodoroSettings } = data;
    dispatch(setTheme(theme));
    dispatch(setPomodoroSettings({ ...pomodoroSettings }));
  };
  return (
    <div>
      <dialog id="settings_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Settings</h3>
          <div className="divider m-1"></div>
          <div className="modal-action">
            <form method="dialog" className="w-full flex flex-col gap-1 max-h-80" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className="font-bold">General</h2>
                <fieldset className="flex justify-between items-center ">
                  <label>App Theme</label>
                  <select className="select w-full max-w-xs" {...register('theme')}>
                    {Object.keys(AppTheme).map((key) => {
                      return (
                        <option key={key} value={key}>
                          {key.toLocaleUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                </fieldset>
              </div>

              <div className="divider m-1"></div>
              <div>
                <h2 className="font-bold">Pomodoro</h2>
                <label>Times (minutes)</label>
                <fieldset className="flex justify-between items-center ">
                  {Object.keys(PomodoroMode).map((key) => {
                    return (
                      <div key={key} className="flex flex-col gap-1 text-center">
                        <p> {key.toLocaleUpperCase()}</p>
                        <input
                          //@ts-ignore
                          {...register(`pomodoroSettings.timer.${key}`)}
                          type="number"
                          min={0}
                          className="input max-w-md p-0 input-md text-center"
                        />
                      </div>
                    );
                  })}
                </fieldset>
                <div className="form-control w-full">
                  <label className="cursor-pointer label">
                    <span className="label-text">Auto Start Breaks</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      {...register('pomodoroSettings.autoStartBreak')}
                    />
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="cursor-pointer label">
                    <span className="label-text">Auto Start Pomodoros</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      {...register('pomodoroSettings.autoStartPomodoro')}
                    />
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="cursor-pointer label">
                    <span className="label-text">Long Break interval</span>
                    <input
                      type="number"
                      className="input max-w-md p-0 input-sm text-center"
                      {...register('pomodoroSettings.longBreakInterval')}
                    />
                  </label>
                </div>
              </div>

              <div className="divider m-1"></div>

              {/* if there is a button in form, it will close the modal */}
              <div>
                <button className="mt-2 btn-sm float-right btn-primary rounded-md">OK</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SettingsModal;
