import React, { useState, useEffect } from 'react';
import TextComponent from './aemComponent1';
import CarouselComponent from './carouselComponent';
import Main from './headerComponent';
import MainPage from './mainPage/mainPage'; 
import Footer from './Footer/footer';
import data from './data';

export default function MyReactComponent() {
  const API_URL = 'http://localhost:4502/content/wknd-muzik/language-masters/en/home-page.model.json';
  const FOOTER_API_URL='http://localhost:4502/content/experience-fragments/wknd-muzik/language-masters/en/site/footer/master.model.json'
  const HEADER_API_URL='http://localhost:4502/content/experience-fragments/wknd-muzik/language-masters/en/site/header/master.model.json'
  const username = 'admin'; /* use the username for local AEM instance */ 
  const password = 'admin'; /* use the password for local AEM instance */ 
  const [aemData, setAemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carouselData,setcarouselData]=useState([])
  const [containerData,setcontainerData]=useState([])

  const aemData1 = data;
  let objectsWithText = [];

  if (aemData1[':items']?.root[':items']?.container[':items']) {
    const items = aemData1[':items'].root[':items'];
    objectsWithText = Object.keys(items)
      .filter(key => key.includes('text'))
      .map(key => items[key]);
  }

  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  function carouselFunction(data) { 
    setcarouselData(data)
   return (<CarouselComponent data={data}/>)  
  }
  useEffect(() => {
    const containers = [];
    const footerContainers = [];
    const fetchAEMData = async () => { 
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: headers,
          // credentials: 'include'
        });
        const jsonData = await response.json();

        const filteredData = Object.entries(jsonData[':items'].root[':items']).reduce((acc, [key, value]) => {
          if (key.includes("container")) {
            containers.push(key);
            acc[key] = value;
          }
          return acc;
        }, {});
      

        containers.forEach(container => {
          if (filteredData.hasOwnProperty(container)) {
               if (filteredData[container][":itemsOrder"].includes("carousel")) {
                const carouselData = filteredData[container][":items"]["carousel"];             
                carouselFunction(carouselData);
              }
              if (filteredData[container][":itemsOrder"].includes("container")) {
                const containerData = filteredData[container][":items"]["container"];
        
                setcontainerData(containerData)
              }
          
          }
      });


;
      
      } catch (error) {
        console.error(error);
      }
    };
    const fetchHeaderData = async () => { 
      try {
        const response = await fetch(HEADER_API_URL, {
          method: 'GET',
          headers: headers,
          // credentials: 'include'
        });
        const jsonData = await response.json();

        const filteredData = Object.entries(jsonData[':items'].root[':items']).reduce((acc, [key, value]) => {
          if (key.includes("container")) {
            containers.push(key);
            acc[key] = value;
          }
          return acc;
        }, {});
      

        containers.forEach(container => {
          if (filteredData.hasOwnProperty(container)) {
               if (filteredData[container][":itemsOrder"].includes("carousel")) {
                const carouselData = filteredData[container][":items"]["carousel"];             
                carouselFunction(carouselData);
              }
              if (filteredData[container][":itemsOrder"].includes("container")) {
                const containerData = filteredData[container][":items"]["container"];
        
                setcontainerData(containerData)
              }
          
          }
      });


;
      
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFooterData = async () => { 
      try {
        const response = await fetch(FOOTER_API_URL, {
          method: 'GET',
          headers: headers,
          // credentials: 'include'
        });
        const jsonData = await response.json();

        const filteredData = Object.entries(jsonData[':items'].root[':items']).reduce((acc, [key, value]) => {
          if (key.includes("container")) {
            footerContainers.push(key);
            acc[key] = value;
          }
          return acc;
        }, {});
      

        footerContainers.forEach(container => {
          if (filteredData.hasOwnProperty(container)) {
              
              if (filteredData[container][":itemsOrder"].includes("container")) {
                console.log("dddd")
                const containerData = filteredData[container][":items"]["container"];
        console.log("ffoter",containerData)
              }
          
          }
      });


;
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchAEMData();
  //  fetchHeaderData();
    fetchFooterData();
  }, []);

  return (
    <div>
      <Main/>
      <div className=''>
      <CarouselComponent data={carouselData} />
      <MainPage data={containerData}/>
      </div>
      <Footer/>
      {/* {console.log('AEM DATA is \n', )} */}
      {/* {objectsWithText.length > 0 ? (
        objectsWithText.map(obj => <TextComponent key={obj.id} data={obj} />)
      ) : (
        <div>No data available.</div>
      )} */}
    </div>
  );
}