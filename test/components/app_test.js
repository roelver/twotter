import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('shows a text', () => {
    expect(component).to.contain('Twotter - like Twitter');
  });

  it('contains a header', () => {
    expect(component.find('header')).to.exist;
  });

  it('contains a body', () => {
    expect(component.find('.app-body')).to.exist;
  });

});
