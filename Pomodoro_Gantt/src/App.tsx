import { Provider } from 'react-redux';
import configDayJS from './configs/day';
import Views from './views';
import { store } from './configs/store';

configDayJS();

function App() {
  return (
      <Provider store={store}>
        <div className=" w-screen h-screen bg-primaryBg">
          <Views />
        </div>
      </Provider>
  );
}
export default App;
