import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./pages/App";
import Splash from "./pages/Splash";

import "mapbox-gl/dist/mapbox-gl.css";
import Context from "./context";
import reducer from "./reducer";
import * as serviceWorker from "./serviceWorker";
import ProtectedRoute from "./ProtectedRoute";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsLink = new WebSocketLink({
  uri: "wss://geopins1.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const Root = () => {
  // useContext hookの戻り値による初期状態の定義
  const initialState = useContext(Context);
  // useReducer hookの戻り値を配列に格納
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log({ state });

  return (
    <Router>
      <ApolloProvider client={client}>
        {/* Contextのインスタンスによるプロバイダ定義 */}
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <ProtectedRoute exact path="/" component={App} />
            <Route path="/login" component={Splash} />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
