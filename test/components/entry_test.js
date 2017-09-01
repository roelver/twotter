import { renderComponent , expect } from '../test_helper';
import Entry from '../../src/components/entry';

describe('Entry' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Entry);
  });

  it('contains an input field', () => {
    expect(component.find('input[type=text]')).to.exist;
  });

  it('contains an button', () => {
    expect(component.find('button')).to.exist;
  });


});
