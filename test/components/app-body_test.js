import { renderComponent , expect } from '../test_helper';
import AppBody from '../../src/components/app-body';

describe('AppBody', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AppBody);
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
      component.find('input').simulate('change', 'hello world');
    });

    it('shows text that is entered', () => {
      expect(component.find('input')).to.have.value('hello world');
    });

    it('when submitted, clear input', () => {
      component.find('button').simulate('click');
      expect(component.find('input')).to.have.value('');
    });

    it('when submitted, new twot is added to the list', () => {
      component.find('button').simulate('click');
      expect(component.find('.twot')).to.exist;
    });

    it('when 2 twots are submitted, the list contains 2 twots', () => {
      component.find('button').simulate('click');
      component.find('input').simulate('change', 'hello world again');
      component.find('button').simulate('click');
      expect(component.find('.twot').length).to.equal(2);
    });

  });

});
