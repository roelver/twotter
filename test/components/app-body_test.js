import sinon from 'sinon';
import axios from 'axios';
import { renderComponent, expect } from '../test_helper';
import AppBody from '../../src/components/app-body';

import state from '../data/dummy_state';
import { dummy1, dummy2 } from '../data/dummy_twot_response';

describe('AppBody', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AppBody, null, state);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('contains a left bar', () => {
    expect(component.find('.app-left-bar')).to.exist;
  });

  it('contains a body', () => {
    expect(component.find('.body-wrapper')).to.exist;
  });

  it('contains a right bar', () => {
    expect(component.find('.app-right-bar')).to.exist;
  });

  it('contains a entry form in the body', () => {
    expect(component.find('.body-wrapper .entry')).to.exist;
  });

  describe(' Entering some text', () => {
    // Executed after the top-level beforeEach
    beforeEach(() => {
      // Enter some text in the textarea
      component.find('textarea').simulate('change', 'hello world');
    });

    it('shows text that is entered', () => {
      expect(component.find('textarea')).to.have.value('hello world');
    });

    it('when submitted, clear input', async () => {
      const promise = Promise;
      const stubResponse = { status: 200, statusText: 'OK', data: dummy1 };
      const stub2 = sinon.stub(axios, 'post')
        .returns(promise.resolve(stubResponse));

      component.find('button').simulate('click');
      await promise;
      stub2.restore();

      expect(component.find('textarea')).to.have.value('');
    });

    it('when submitted, new twot is added to the list', async () => {
      const promise = Promise;
      const stubResponse = { status: 200, statusText: 'OK', data: dummy1 };
      const stub2 = sinon.stub(axios, 'post')
        .returns(promise.resolve(stubResponse));

      component.find('button').simulate('click');
      await promise;

      stub2.restore();

      expect (component.find('.twot')).to.exist;
      expect(component.find('.twot').length).to.equal(3); // 2 from state and 1 new

    });

  });
});
