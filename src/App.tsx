import { BrowserRouter } from "react-router-dom";
import Paths from "./paths";
import RegisterProvider from "./contexts/registerContext";
import LoginProvider from "./contexts/loginContexts";
import TodosProvider from "./contexts/todosContexts";

function App() {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <LoginProvider>
          <TodosProvider>
            <Paths />
          </TodosProvider>
        </LoginProvider>
      </RegisterProvider>
    </BrowserRouter>
  );
}
export default App;
