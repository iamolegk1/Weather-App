import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/cities/:id" render={() => <div></div>} exact />
        <Route render={() => <div>Page not found</div>} />
      </Switch>
    </Router>
  );
};

export default App;
