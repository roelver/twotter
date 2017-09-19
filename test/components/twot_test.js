import { renderComponent, expect } from '../test_helper';
import Twot from '../../src/components/twot';

describe('Twot', () => {
  let component;

  beforeEach(() => {
    const props = { twot: {
      _id: '1',
      text: 'Hello World!',
      posted: 'Today',
      user: {
        _id: '2838234892',
        fullname: 'Tester',
        avatarUrl: 'dummy.png'
      }
    }
    };
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
