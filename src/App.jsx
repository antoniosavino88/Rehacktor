import SessionProvider from "./context/SessionProvider";
import "./global.css";
import { Routing } from "./routes/Routing";

function App() {
  return (
    <SessionProvider>
      <Routing />
    </SessionProvider>
  );
}

export default App;
