import img from "../../assets/notFound.png";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen text-center gap-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-6 font-title">
        404 - Page not found
      </h1>
      <img
        src={img}
        alt="Pagina non trovata"
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto"
      />
    </div>
  );
}
