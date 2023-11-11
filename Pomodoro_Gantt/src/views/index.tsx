import { useEffect } from 'react';
import { AppStatus } from '../common/enum';
import { useAppDispatch, useAppSelector } from '../configs/hooks';
import ErrorPage from './ErrorPage';
import { fetchInitPreferences } from '../redux/general/thunks';
import LoadingPage from './LoadingPage';
import Main from './Main';
import SettingsModal from './Modals/SettingsModal';

function Views() {
  const dispatch = useAppDispatch();
  const { status, theme } = useAppSelector((state) => state.general);

  useEffect(() => {
    (async () => {
      await dispatch(fetchInitPreferences());
    })();
  }, []);

  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
  }, [theme]);

  switch (status) {
    case AppStatus.error:
      return <ErrorPage />;
    case AppStatus.loading:
      return <LoadingPage />;
    case AppStatus.success:
      return (
        <div>
          <SettingsModal />
          <Main />
        </div>
      );
    default:
      return <ErrorPage />;
  }
}
export default Views;
