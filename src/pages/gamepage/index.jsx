import { useParams } from "react-router";
import PacmanLoader from "react-spinners/PacmanLoader";
import useFetchSolution from "../../hooks/useFetch";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
  const { id } = useParams();
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=2a8cb120892248bd952e976161641d53`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <PacmanLoader color="#FBBF24" />{" "}
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-screen text-error">
          <h1>{error}</h1>
        </div>
      )}
      {data && (
        <div className="flex flex-col lg:flex-row items-start gap-8 bg-secondary text-text p-8 rounded-lg shadow-xl">
          {/* Info Gioco */}
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-400 italic">
              Pubblicazione: {data.released}
            </p>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-accent text-sm font-semibold">
              ⭐ Rating: {data.rating}
            </p>
            <ToggleFavorite data={data} />
            <div>
              <p className="text-lg font-semibold mb-1">About:</p>
              <p className="text-gray-300 leading-relaxed">
                {data.description_raw}
              </p>
            </div>
          </div>

          {/* Immagine */}
          <div className="w-full lg:w-1/2 overflow-hidden shadow-lg">
            <img
              src={data.background_image}
              alt={data.name}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="style-chatbox">
            <Chatbox data={data && data} />
          </div>
        </div>
      )}
    </>
  );
}
