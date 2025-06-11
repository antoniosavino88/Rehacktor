import img from "../../assets/notFound.png";
export default function ErrorPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text my-8 text-center">
        Page not found
      </h1>
      <div className="flex justify-center items-center min-h-[400px] mt-30">
        <img src={img} alt="" className=" max-w-[700px]" />
      </div>
    </>
  );
}
