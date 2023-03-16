import React from "react";
import { Route, Switch } from 'react-router-dom';
import { About } from "./About";
import { Home } from "./Home";
import { AskGPT } from "./AskGPT";
import './App.css';

// import { Elem } from './Elem';
// import { changeColor } from '../injected';

export default function App() {
  return (
    <Switch>
        <Route path="/about">
            <About/>
        </Route>
        <Route path="/askGPT">
            <AskGPT/>
        </Route>
        <Route path="/">
            <Home/>
        </Route>
    </Switch>
  );
}
