import { Button, CogIcon, Group } from 'evergreen-ui';
import { useMemo } from 'react';
import { AppTab } from '../../common/enum';
import { useAppDispatch, useAppSelector } from '../../configs/hooks';
import { setTabs } from '../../redux/general/generalSlice';
import Gantt from '../Gantt';
import Porodomo from '../Porodomo';
import Logo from '../../assets/tomato.svg';

interface OptionComponent {
  label: string;
  component: React.ReactElement;
}
const Main = () => {
  const dispatch = useAppDispatch();
  const { tabs } = useAppSelector((state) => state.general);
  const options: { [keys: string]: OptionComponent } = useMemo(() => {
    return Object.assign(
      {},
      {
        [AppTab.gantt]: { label: 'Gantt', component: <Gantt /> },
        [AppTab.porodomo]: { label: 'Porodomo', component: <Porodomo /> },
      }
    );
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between align-middle">
        <div className="flex align-middle ">
          <img src={Logo} className="h-[40px] " />
          <span className="py-1">ToMaTo Gantt</span>{' '}
        </div>
        <Group className="align-middle">
          {Object.keys(options).map((_key: string) => {
            const { label } = options[_key] as OptionComponent;
            return (
              <Button
                height={38}
                intent="success"
                appearance="primary"
                key={label}
                isActive={_key === tabs}
                onClick={() => dispatch(setTabs(_key as AppTab))}
              >
                {label}
              </Button>
            );
          })}
        </Group>

        <Button  height={38} marginRight={12} iconAfter={CogIcon} appearance="minimal">
          Settings
        </Button>
      </div>

      <div className="pt-2">{options[tabs].component}</div>
    </div>
  );
};

export default Main;
