import { useState, useCallback } from "react";
import NotificationContext from "./NotificationContext";
import AlertBanner from "../components/AlertBanner";

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback(
    ({ message, type = "success", duration = 3000 }) => {
      setNotification({ message, type, duration });
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <AlertBanner
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
}
