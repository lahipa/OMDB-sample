import { useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { connect } from "react-redux";
import { getMovieById, createLoadingSelector } from "../../reduxs";
import { DetailMovie } from "../../services/datatypes";

interface DetailProps {
  omdbkey: string;
  movie: DetailMovie;
  loading: boolean;
  getMovieById: (key: any, id: any) => void;
}

const Detail: NextPage<DetailProps> = (props: Partial<DetailProps>) => {
  const { omdbkey, movie, loading, getMovieById } = props;

  const router = useRouter();

  const { omdbid } = router.query;

  useEffect(() => {
    getMovieById!(omdbkey, omdbid);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container sm:mx-auto px-5">
      <div className="py-20 flex gap-10">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <div className="relative" style={{ height: 444 }}>
              <Image src={movie && movie.Poster ? movie.Poster : "/null"} width={300} height={444} alt="" />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xl">{movie?.Title} (<small>{movie?.Year}</small>)</h4>
              
              <p className="mt-4">
                Genre:
                <br />
                {movie?.Genre}
              </p>

              <p className="mt-4">
                Director:
                <br />
                {movie?.Director}
              </p>

              <p className="mt-4">
                Plot:
                <br />
                {movie?.Plot}
              </p>

              <p className="mt-4">
                Writter:
                <br />
                {movie?.Writer}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const omdbkey = process.env.OMDB_API_KEY;

  // Pass data to the page via props
  return { props: { omdbkey } };
};

const loadingSelector = createLoadingSelector(["GET_MOVIE"]);

const mapStateToProps = (state: any) => ({
  loading: loadingSelector(state),
  movie: state.rdcmovies.movie,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovieById: (key: string, id: string) => dispatch(getMovieById(key, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
