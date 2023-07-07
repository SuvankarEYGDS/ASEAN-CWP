import React from 'react';
import Container from './container';

const MainPage = (props) => {
  const jsonData = {
    container: props.data
  };

  const { container } = jsonData;
  const { ':itemsOrder': itemsOrder, ':items': items } = container;

  return props.data ? (
    <div>
      <Container itemsOrder={itemsOrder} items={items} />
    </div>
  ):null;
};

export default MainPage;