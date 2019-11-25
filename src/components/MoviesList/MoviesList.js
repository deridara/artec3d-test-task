import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import history from "../../history";
import { loadMovies } from "../../modules/movies";
import ButtonTemplate from "../common/Button";
import MovieListElement from "./MovieListElement";

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled(ButtonTemplate)`
  margin-bottom: 1em;
`;

const TextStub = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`;

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.data);

  useEffect(() => {
    if (!Object.keys(movies).length) {
      dispatch(loadMovies());
    }
  }, []);

  const renderMoviesList = array =>
    array.map(movie => (
      <MovieListElement movie={movie} key={`movie-${movie.id}`} />
    ));

  const onAddButtonClick = () => {
    history.push("/add-new-movie");
  };

  return (
    <Wrapper>
      <Title>the Movies List</Title>
      <Button onClick={onAddButtonClick}>+ Add a Movie</Button>
      {Object.keys(movies).length ? (
        renderMoviesList(Object.values(movies))
      ) : (
        <TextStub>Waiting for movies...</TextStub>
      )}
    </Wrapper>
  );
};

export default MoviesList;
