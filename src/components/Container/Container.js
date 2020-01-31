import React from 'react';

const Container = ({ children, className = '', style = {} }) => {
  const defaultStyle = {
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  };
  return (
    <div style={{ ...defaultStyle, ...style }} className={className}>
      {children}
    </div>
  );
};

export default Container;
