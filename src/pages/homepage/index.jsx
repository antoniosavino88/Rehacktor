import useFetch from "../../hooks/useFetch";
import CardGame from "../../components/CardGame";
import Spinner from "../../components/Spinner";

export default function HomePage() {
  const url = `https://api.rawg.io/api/games?key=d3b1df65b58748b0995c8ac8aec8c20a&dates=2024-01-01,2024-12-31&page=1`;
  const { data, isPending, error } = useFetch(url);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white">Homepage</h1>

      {isPending && <Spinner />}
      <div className="grid-games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {error && <article>{error}</article>}
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>
    </>
  );
}
