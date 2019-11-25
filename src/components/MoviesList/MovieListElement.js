import React from "react";
import styled from "styled-components";
import { renderTimeString } from "../../utils";
import history from "../../history";

const Wrapper = styled.div`
  border: 1px solid #bbb;
  padding: 20px;
  min-height: 195px;
  box-sizing: border-box;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:hover {
    background: #eaeaea;
  }
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
const GenresWrapper = styled.div`
  color: gray;
  margin-bottom: 0.5em;
`;

const Poster = styled.div`
  height: 155px;
  width: 103px;
  background-color: #eee;
  background-image: url(${props => props.url});
  background-size: cover;
  float: right;
`;

const Director = styled.div`
  margin-bottom: 0.5em;
`;

const MovieListElement = ({ movie }) => {
  const { id, title, year, runtime, genres, director, posterUrl } = movie;
  const onCardClick = () => history.push(`/${id}`);
  return (
    <Wrapper onClick={onCardClick}>
      <Poster url={posterUrl} oneError="https://ru.stackoverflow.com/" />
      <Title>{title} </Title>
      {year && <Year>{year}</Year>}
      {genres.length ? <GenresWrapper>{genres.join(", ")}</GenresWrapper> : ''}
      {director && <Director>Director: {director}</Director>}
      {runtime && <Runtime>Runtime: {renderTimeString(runtime)}</Runtime>}
    </Wrapper>
  );
};

export default MovieListElement;
