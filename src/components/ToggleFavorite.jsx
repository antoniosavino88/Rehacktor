import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import { useNotification } from "../context/NotificationContext";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorites, removeFavorite } =
    useContext(FavoritesContext);
  const { showNotification } = useNotification();

  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

  const handleAdd = () => {
    addFavorites(data);
    showNotification({
      message: `"${data.name}" aggiunto ai preferiti!`,
      type: "success",
    });
  };

  const handleRemove = () => {
    removeFavorite(data.id);
    showNotification({
      message: `"${data.name}" rimosso dai preferiti.`,
      type: "error",
    });
  };

  return (
    <div>
      {isFavorite() ? (
        <button
          onClick={handleRemove}
          className="cursor-pointer text-error"
          title="Rimuovi dai preferiti"
        >
          <FaHeart />
        </button>
      ) : (
        <button
          onClick={handleAdd}
          className="cursor-pointer text-text"
          title="Aggiungi ai preferiti"
        >
          <FaRegHeart />
        </button>
      )}
    </div>
  );
}
