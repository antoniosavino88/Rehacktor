// import { useParams } from "react-router";

// export default function GenrePage() {
//   const { genre } = useParams();

//   return (
//     <h1 className="text-3xl font-bold text-white text-center mt-10">
//       Welcome to {genre} page
//     </h1>
//   );
// }

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import CardGame from "../components/CardGame";
import Spinner from "../components/Spinner";

export default function GenrePage() {
  const { genre } = useParams();

  const url = `https://api.rawg.io/api/games?key=d3b1df65b58748b0995c8ac8aec8c20a&genres=${genre}&page=1`;
  const { data, isPending, error } = useFetch(url);

  return (
    <>
      <h1 className="text-3xl font-bold text-white my-10 capitalize">
        {genre} games
      </h1>
      {isPending && <Spinner />}
      <div className="grid-games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {error && <article>{error}</article>}
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>
    </>
  );
}
