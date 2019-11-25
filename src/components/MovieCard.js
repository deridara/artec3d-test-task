import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { loadMovies } from "../modules/movies";
import { renderTimeString } from "../utils";
import history from '../history'
import TextStub from "./common/TextStub";
import ButtonTemplate from "./common/Button";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
`;

const Button = styled(ButtonTemplate)`
  margin-top: 2em;
`;
const BackButton = styled(ButtonTemplate)`
  margin-bottom: 2em;
`;

const Poster = styled.div`
  height: 300px;
  width: 200px;
  background-color: #eee;
  background-image: url(${props => props.url});
  background-size: cover;
  float: right;
  margin-left: 50px;
`;

const Title = styled.div`
  font-size: 2em;
  margin-bottom: 0.5em;
`;
const Year = styled.div`
  color: gray;
  margin-bottom: 0.5em;
`;
const Runtime = styled.div`
  margin-bottom: 0.5em;
`;

const Director = styled.div`
  margin-bottom: 0.5em;
`;
const ActorsWrapper = styled.div`
  margin-bottom: 0.5em;
`;
const GenresWrapper = styled.div`
  color: gray;
  margin-bottom: 0.5em;
`;
const Plot = styled.div`
  margin-top: 2em;
  margin-bottom: 0.5em;
`;

const MovieCard = props => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const movies = useSelector(state => state.movies.data);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!Object.keys(movies).length) {
      dispatch(loadMovies());
    }
  }, []);
  if (!Object.keys(movie).length && Object.keys(movies).length && !error) {
    const movie = movies[id];
    if (!movie) {
      setError("Sorry, this movie is not availiable");
    } else {
      setMovie(movie);
    }
  }

  const onEditButtonClick = () => history.push("/edit/" + id);
  
  const renderCard = movie => {
    const {
      title,
      year,
      runtime,
      genres,
      director,
      posterUrl,
      actors,
      plot
    } = movie;
    return (
      <React.Fragment>
        <BackButton onClick={() => history.push("/")}>
          ⟵ to All Movies
        </BackButton>
        <Poster url={posterUrl} />
        <Title>{title}</Title>
        {year && <Year>{year}</Year>}
        {genres.length && <GenresWrapper>{genres.join(", ")}</GenresWrapper>}
        {runtime && <Runtime>Runtime: {renderTimeString(runtime)}</Runtime>}
        {director && <Director>Director: {director}</Director>}
        {actors && <ActorsWrapper>Actors: {actors}</ActorsWrapper>}
        <Plot>{plot}</Plot>
        <Button onClick={onEditButtonClick}>Edit</Button>
      </React.Fragment>
    );
  };

  return (
    <Wrapper>
      {error ? (
        <TextStub>{error}</TextStub>
      ) : Object.keys(movie).length ? (
        renderCard(movie)
      ) : (
        <TextStub>Waiting for the movie info...</TextStub>
      )}
    </Wrapper>
  );
};

export default MovieCard;
