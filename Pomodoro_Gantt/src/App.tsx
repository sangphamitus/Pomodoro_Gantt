import { Provider } from 'react-redux';
import configDayJS from './configs/day';
import { store } from './configs/store';
import Views from './views';

configDayJS();

function App() {
  return (
    <Provider store={store}>
      <div className=" w-screen h-screen  bg-base-100 ">
        <Views />
      </div>
    </Provider>
  );
}
export default App;
