import ToDoList from "./components/ToDoList";
import ToDoContextProvider from "./contexts/ToDoContext";

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="container">
          <ToDoContextProvider>
            <ToDoList />
          </ToDoContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
