import { BrowserRouter } from "react-router-dom";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
import NotificationProvider from "./context/NotificationProvider";
import "./global.css";
import { Routing } from "./routes/Routing";

function App() {
  return (
    <NotificationProvider>
      <SessionProvider>
        <FavoritesProvider>
          <Routing />
        </FavoritesProvider>
      </SessionProvider>
    </NotificationProvider>
  );
}

export default App;
