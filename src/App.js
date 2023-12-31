import { Provider } from "react-redux";
import "./App.css";
import TodoList from "./Components/TodoList";
import store from "./Redux/store";
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <TodoList />
    </div>
    </Provider>
  );
}

export default App;
