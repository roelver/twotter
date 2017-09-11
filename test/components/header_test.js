import { renderComponent , expect } from '../test_helper';
import Header from '../../src/components/header';

describe('Header' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Header);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('contains a brand', () => {
    expect(component.find('.navbar-brand')).to.contain('TWOTTER');
  });


});
