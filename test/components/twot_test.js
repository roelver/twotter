import { renderComponent , expect } from '../test_helper';
import Twot from '../../src/components/twot';

describe('Twot' , () => {
  let component;

  beforeEach(() => {
    const props = { twot: {
      id: '1',
      authorId: 'Tester',
      authorName: 'Tester',
      text: 'Hello World!',
      datePosted: 'Today'
    }};
    component = renderComponent(Twot, props);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('author is filled correctly', () => {
    expect(component.find('.origin>.author')).to.contain('Tester');
  });

  it('date is filled correctly', () => {
    expect(component.find('.origin>.date')).to.contain('Today');
  });

  it('text is filled correctly', () => {
    expect(component.find('.message')).to.contain('Hello World!');
  });

});
