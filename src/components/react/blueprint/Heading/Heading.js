import React from 'react';
import { H1, H2, H3, H4, H5, H6 } from '@blueprintjs/core';

class Heading extends React.Component {
  render() {
    const { type = 'H1', children } = this.props;
    switch (type) {
      case 'H1':
        return <H1>{children}</H1>;
      case 'H2':
        return <H2>{children}</H2>;
      case 'H3':
        return <H3>{children}</H3>;
      case 'H4':
        return <H4>{children}</H4>;
      case 'H5':
        return <H5>{children}</H5>;
      case 'H6':
        return <H6>{children}</H6>;
      default:
        throw new Error('Invalid Heading type');
    }
  }
}

export default {
  component: Heading,
  getLabel: obj =>
    `[${obj.props.type.value || obj.props.type.default}] ${obj.props.children.value || obj.props.children.default}`,
  icon: 'header',
  label: '[H1] Sample Heading',
  description: 'A heading component',
  props: {
    children: {
      type: 'string',
      default: 'Sample Heading'
    },
    type: {
      type: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      default: 'H1'
    }
  }
};
