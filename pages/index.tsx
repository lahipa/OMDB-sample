import { useEffect, useState, useRef, useCallback, FormEvent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
// Components
import { Modal, ListMovieCard } from "../components";
// Data
import { connect } from "react-redux";
import { getMoviesBySearch } from "../reduxs";
import { ListMovie } from "../services/datatypes";

interface HomeProps {
  omdbkey: string;
  movies: Array<ListMovie>;
  getMoviesBySearch: (omdbkey: any, keywords: string, page: number) => void;
  clearState: () => void;
}

const Home: NextPage<HomeProps> = (props: Partial<HomeProps>) => {
  const { omdbkey, movies, getMoviesBySearch, clearState } = props;

  const [keywords, setKeywords] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [poster, setPoster] = useState<string>("");

  const observer = useRef<any>();

  const lastElementRef = useCallback((node) => {
    // if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => { return prevPage + 1; });
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore]);

  useEffect(() => {
    clearState!();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasMore(movies!.length > 0);
  }, [movies]);

  useEffect(() => {
    if (hasMore) {
      getMoviesBySearch!(omdbkey, keywords, page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (hasMore) {
      clearState!();
      setPage(1);
    }

    getMoviesBySearch!(omdbkey, keywords, page);
  };

  const handlePoster = (value: string) => {
    setPoster(value);
  }

  return (
    <div className="container sm:mx-auto px-5">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="py-20">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className="text-2xl text-gray-400 tracking-wide">Cari film favorit kamu ..</label>
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="h-14 px-5 flex-1 rounded-md outline-none border-2"
                  placeholder="e.g. Batman"
                />

                <button
                  type="submit"
                  className="h-14 w-40 text-white flex items-center justify-center rounded-md transition duration-500 bg-blue-500 hover:bg-blue-600 focus:ring-blue-600"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {movies?.map((val: ListMovie, i: number) => {
            if (movies.length === i + 1) {
              return (
                <div key={i.toString()} ref={lastElementRef}>
                  <ListMovieCard movie={val} doSetPoster={handlePoster} />
                </div>
              );
            }

            return (
              <div key={i.toString()}>
                <ListMovieCard movie={val} doSetPoster={handlePoster} />
              </div>
            );
          })}
        </div>
      </main>

      {/* <Modal
        size="sm"
        open={!!poster}
        onClose={() => setPoster("")}
      >
        <div className="relative" style={{ height: 444 }}>
          <Image src={poster} layout="fill" objectFit="cover" alt="" />
        </div>
      </Modal> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const omdbkey = process.env.OMDB_API_KEY;

  // Pass data to the page via props
  return { props: { omdbkey } };
};

const mapStateToProps = (state: any) => ({
  movies: state.rdcmovies.movies,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMoviesBySearch: (key: string, keywords: string, page: number) => dispatch(getMoviesBySearch(key, keywords, page)),
  clearState: () => dispatch({ type: "CLEAR_MOVIES" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
