import React from 'react';
import './container.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Container = ({ itemsOrder, items }) => {

  const renderComponent = (component) => {
    switch (component[':type']) {
      case 'wknd-muzik/components/teaser':
        return ( 
            <Card key={component.id} className='teaser boxshadow'>
                  <Card.Body>
                    <Card.Title>{component.title}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: component.description }} >
                  
                    </Card.Text>
                    
                  </Card.Body>
            </Card>
        );
      case 'wknd-muzik/components/title':
        return (
          <div key={component.id} className="title">
            <h2 dangerouslySetInnerHTML={{ __html: component.text }} />
            {/* Add additional title component elements */}
          </div>
        );
      case 'wknd-muzik/components/list':
        return (
          <div key={component.id} className='row'>
              {component.items.map((item) => (
                <div className='col'>
                  <Card  key={item.id} className='boxshadow'>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: item.description }}>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                  </Card>
                  </div>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {itemsOrder  && itemsOrder.map((itemKey) => {
        const component = items[itemKey];
        if (component) {
          return renderComponent(component);
        }
        return null;
      })}
    </div>
  );
};

export default Container;