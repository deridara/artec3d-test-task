import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import history from "./history";
import MoviesList from "./components/MoviesList";
import MovieCard from "./components/MovieCard";
import Page404 from './components/Page404'
import EditMoviePage from "./components/EditMoviePage";

const Routes = () => {
    return (
      <React.Fragment>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={MoviesList} />
              <Route exact path="/add-new-movie" component={EditMoviePage} />
              <Route exact path="/edit/:id" component={EditMoviePage} />
              <Route exact path="/:id" component={MovieCard} />
              <Route component={Page404} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </React.Fragment>
    );
  
};

export default Routes;
