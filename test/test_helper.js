import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { JSDOM } from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Setup a testing environment to run like a browser
// JSDOM is a fake browser
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = jsdom.window;
global.document = global.window.document;
global.navigator = global.window.navigator;
const $ = _$(global.window);

// Setup Chai-jquery
chaiJquery(chai, chai.util, $);

// Helper for rendering components
function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // Produces HTML
}

// Helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
