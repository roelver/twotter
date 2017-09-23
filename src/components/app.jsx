import React from 'react';

import AppBody from './app-body';

const App = ({ match }) => {
  return (
    <div className="app-root">
      <div className="row">
        <div className="col-xs-12">
          <AppBody hashtag={match.params.hashtag} />
        </div>
      </div>
    </div>
  );
};

export default App;
