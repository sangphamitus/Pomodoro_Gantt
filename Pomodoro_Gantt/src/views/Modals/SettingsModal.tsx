import { SubmitHandler, useForm } from 'react-hook-form';
import { AppTheme } from '../../common/enum';
import { useAppDispatch, useAppSelector } from '../../configs/hooks';
import { setTheme } from '../../redux/general/generalSlice';

type Inputs = {
  theme: AppTheme;
};

const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.general);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      theme: theme,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { theme } = data;
    dispatch(setTheme(theme));
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
            <form method="dialog" className="w-full" onSubmit={handleSubmit(onSubmit)}>
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

              {/* if there is a button in form, it will close the modal */}
              <button className="mt-2 btn-sm float-right btn-primary rounded-md">OK</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SettingsModal;
