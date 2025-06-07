import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorites, removeFavorite } =
    useContext(FavoritesContext);

  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

  return (
    <div>
      {isFavorite() ? (
        <button
          onClick={() => removeFavorite(data.id)}
          className="cursor-pointer"
        >
          <FaHeart />
        </button>
      ) : (
        <button onClick={() => addFavorites(data)} className="cursor-pointer">
          <FaRegHeart />
        </button>
      )}
    </div>
  );
}
