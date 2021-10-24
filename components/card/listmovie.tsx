import Image from "next/image";
import Link from "next/link";

// Datatype
import { ListMovie } from "../../services/datatypes";

interface ListMovieCardProps {
  movie: ListMovie;
  doSetPoster: (value: string) => void;
}

export default function ListMovieCard(props: ListMovieCardProps) {
  const { movie, doSetPoster } = props;

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-lg bg-white">
      <button
        className="relative outline-none bg-none"
        style={{ height: 300 }}
        onClick={() => doSetPoster(movie.Poster !== "N/A" ? movie.Poster : "/null")}
      >
        <Image src={movie.Poster === "N/A" ? "/null" : movie.Poster} layout="fill" objectFit="cover" alt="" />
      </button>
      <div className="p-4 flex flex-col h-32 justify-between">
        <p className="text-base">
          <b>{movie.Title}</b>
          {" "}
          -
          {" "}
          <span className="text-gray-500">{movie.Year}</span>
        </p>

        <div className="flex justify-center">
          <Link href={`detail/${movie.imdbID}`}>
            <a>See More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
