import React from 'react';

import AppBody from './app-body';

const App = () => {
  return (
    <div className="app-root">
      <div className="row">
        <div className="col-xs-12">
          <header>
            <h1>Twotter - like Twitter</h1>
          </header>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <AppBody />
        </div>
      </div>
    </div>
  );
};

export default App;
