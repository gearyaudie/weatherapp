import React from "react";
import { Provider } from "react-redux";
import { Weather } from "./components/Weather";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
};

export default App;
