import { useEffect } from 'react';
import { AppStatus } from '../common/enum';
import { useAppDispatch, useAppSelector } from '../configs/hooks';
import ErrorPage from './ErrorPage';
import { fetchInitPreferences } from '../redux/general/thunks';
import LoadingPage from './LoadingPage';
import Main from './Main';

function Views() {
  const dispatch =useAppDispatch();
  const { status } = useAppSelector((state) => state.general);


  useEffect(() => {
    (async()=>{
      await dispatch(fetchInitPreferences())
    })();
  }, []);

  switch (status) {
    case AppStatus.error:
      return <ErrorPage />;
    case AppStatus.loading:
      return <LoadingPage />
    case AppStatus.success:
      return <Main />
    default:
      return <ErrorPage />
  }
}
export default Views;
