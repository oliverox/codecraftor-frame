import Heading from './Heading/Heading';
import Span from './Span/Span';
import Container from './Container/Container';
import SpinnerOverlay from './SpinnerOverlay/SpinnerOverlay';

const modules = { Heading, Span, Container, SpinnerOverlay };

const componentList = {
  Container: {
    name: 'Generic container',
    icon: 'control'
  }, 
  Button: {
    name: 'Button',
    icon: 'widget-button'
  },
  PageHeader: {
    name: 'Page Header',
    icon: 'widget-header'
  },
  Heading: {
    name: 'Heading',
    icon: 'header'
  },
  Image: {
    name: 'Image',
    icon: 'media'
  },
  Text: {
    name: 'Text',
    icon: 'font'
  },
  Paragraph: {
    name: 'Paragraph',
    icon: 'paragraph'
  }
};

export default componentList;
export { modules };

// React -> Blueprint Components
// import Heading from './react/blueprint/Heading/Heading';
// import Button from './react/blueprint/Button/Button';

// export { SpinnerOverlay, Heading, Button };
