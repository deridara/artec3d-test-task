import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { loadMovies, editMovie, addNewMovie } from "../modules/movies";
import history from "../history";
import ButtonTemplate from "./common/Button";
import TextStub from "./common/TextStub";

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  padding: 20px;
`;
const Button = styled(ButtonTemplate)`
  margin-top: 10px;
  margin-right: 10px;
`;

const BackButton = styled(ButtonTemplate)`
  margin-bottom: 2em;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 2px;
`;

const Error = styled.div`
  color: red;
  position: absolute;
  bottom: 0;
  width: 100px;
`;
const EditMoviePage = () => {
  const movies = useSelector(state => state.movies.data);
  const dispatch = useDispatch();
  const { id: movieId } = useParams();

  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(false);

  /*
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [genres, setGenres] = useState("");
  const [director, setDirector] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [actors, setActors] = useState("");
  const [plot, setPlot] = useState("");
  */

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    runtime: "",
    genres: [],
    director: "",
    posterUrl: "",
    actors: "",
    plot: ""
  });
  useEffect(() => {
    if (!Object.keys(movies).length) {
      dispatch(loadMovies());
    }
  }, []);

  if (!Object.keys(movie).length && Object.keys(movies).length && !error) {
    const movie = movies[movieId];
    if (!movie) {
      setError("Sorry, you can't edit this movie");
    } else {
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
      setMovie(movie);
      setFormData({
        title,
        year,
        runtime,
        genres,
        director,
        posterUrl,
        actors,
        plot
      });
    }
  }

  const onFormItemChange = ({ name, value }) => {
    setValidationError(false);
    if (name === "genres")
      setFormData({ ...formData, [name]: value.split(", ") });
    else setFormData({ ...formData, [name]: value });
  };

  const renderForm = () => {
    /* const {
      title,
      year,
      runtime,
      genres,
      director,
      posterUrl,
      actors,
      plot
    } = movie; */
    return (
      <React.Fragment>
        <Label>
          Title:
          <Input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={({ target }) => onFormItemChange(target)}
          />
          {validationError && <Error>required field</Error>}
        </Label>
        <Label>
          Poster URL:
          <Input
            type="text"
            name="posterUrl"
            value={formData.posterUrl}
            required
            onChange={({ target }) => onFormItemChange(target)}
          />
          {validationError && <Error>required field</Error>}
        </Label>
        <Label>
          Year:
          <Input
            type="text"
            name="year"
            value={formData.year}
            onChange={({ target }) => onFormItemChange(target)}
          />
        </Label>
        <Label>
          Genres
          <Input
            type="text"
            name="genres"
            value={formData.genres.join(", ")}
            onChange={({ target }) => onFormItemChange(target)}
          />
        </Label>
        <Label>
          Runtime:
          <Input
            type="text"
            name="runtime"
            value={formData.runtime}
            onChange={({ target }) => onFormItemChange(target)}
          />
        </Label>
        <Label>
          Director
          <Input
            type="text"
            name="director"
            value={formData.director}
            onChange={({ target }) => onFormItemChange(target)}
          />
        </Label>
        <Label>
          Actors:
          <Input
            type="text"
            name="actors"
            value={formData.actors}
            onChange={({ target }) => onFormItemChange(target)}
          />
        </Label>
        <Label>
          Plot:
          <TextArea
            name="plot"
            value={formData.plot}
            required
            onChange={({ target }) => onFormItemChange(target)}
          />
          {validationError && <Error>required field</Error>}
        </Label>
      </React.Fragment>
    );
  };

  const fieldsIsValid = formData => {
    return Boolean(formData.title && formData.posterUrl && formData.plot);
  };

  const onSaveEditedMovie = () => {
      console.log({formData})
    if (fieldsIsValid(formData)) {
      dispatch(editMovie(formData, movieId));
      history.push(`/${movieId}`);
    } else setValidationError(true);
  };
  const onSaveNewMovie = () => {
    if (fieldsIsValid(formData)) {
      dispatch(addNewMovie(formData));
      history.push(`/`);
    } else setValidationError(true);
  };
  const onCancel = () => {
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
    setMovie(movie);
    setFormData({
      title,
      year,
      runtime,
      genres,
      director,
      posterUrl,
      actors,
      plot
    });
  };
  
  return (
    <Wrapper>
      {movieId ? (
        <BackButton onClick={() => history.push(`/${movieId}`)}>
          ⟵ Back to Movie Card
        </BackButton>
      ) : (
        <BackButton onClick={() => history.push(`/`)}>
          ⟵ Back to All Movies
        </BackButton>
      )}
      {renderForm()}
      {movieId ? (
        <div>
          <Button onClick={onSaveEditedMovie}>Save</Button>
          <Button light onClick={onCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={onSaveNewMovie}>Save</Button>
      )}
    </Wrapper>
  );
};

export default EditMoviePage;
