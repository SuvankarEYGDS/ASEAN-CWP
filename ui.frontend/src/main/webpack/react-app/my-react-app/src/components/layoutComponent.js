import React, { useState, useEffect } from 'react';
import HeaderComponent from './common/headerComponent';
import CarouselComponent from './common/carouselComponent';
import MainPage from './mainPage/mainPage'; 
import data from './data';
import Footer from './Footer/footer';
export default function LayoutComponent() {
    const API_URL = 'http://localhost:4502/content/wknd-muzik/language-masters/en/home-page.model.json';
    const username = 'admin'; /* use the username for local AEM instance */ 
    const password = 'admin'; /* use the password for local AEM instance */ 
    const FOOTER_API_URL='http://localhost:4502/content/experience-fragments/wknd-muzik/language-masters/en/site/footer/master.model.json'
    const HEADER_API_URL='http://localhost:4502/content/experience-fragments/wknd-muzik/language-masters/en/site/header/master.model.json'
    const [aemData, setAemData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [carouselData,setcarouselData]=useState([])
    const [containerData,setcontainerData]=useState([])
    const [membership,setMembership]=useState({})
    const [shows,setShows]=useState({})
    const [contact,setContact]=useState({})
    const [footerText,setFooterText]=useState('')

    const [logo,setLogo]=useState('')
    const [hedaerContainer,setHedaerContainer]=useState({})
    const [navigation,setNavigation]=useState({})
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
      const headerContainers = [];
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
            if(key.includes('text')){
              footerContainers.push(key);
              acc[key] = value;
            }
            return acc;
          }, {});
      
          footerContainers.forEach(container => {
           
            if (filteredData.hasOwnProperty(container)) {
                
                if (filteredData[container][":itemsOrder"].includes("container")) {
                 const membership = filteredData[container][":items"]["container"];
                 setMembership(membership)
                 const shows = filteredData[container][":items"]["container_copy"];
                 setShows(shows)
                 const contact = filteredData[container][":items"]["container_copy_297778648"];
                 setContact(contact)
                }

                const footerText=filteredData['text']['text']
                setFooterText(footerText)

                if (filteredData[container][":itemsOrder"].includes("container_copy_15965")) {
                  console.log("Ss")
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
              headerContainers.push(key);
              acc[key] = value;
            }
            if(key.includes('image')){
              headerContainers.push(key);
              acc[key] = value;
            }
            if(key.includes('navigation')){
              headerContainers.push(key);
              acc[key] = value;
            }
            return acc;
          }, {});
          console.log(0,filteredData)

          const logoData = filteredData['image']["src"];    
          setLogo(logoData)   
          console.log(1,logoData)

          const navigationData = filteredData['navigation']["items"]; 
          setNavigation(navigationData)  
          console.log(2,navigationData) 

          const containerData = filteredData['container'][":items"];   
          setHedaerContainer(containerData)
          console.log(3,containerData) 

        } catch (error) {
          console.error(error);
        }
      };
      fetchAEMData();
      fetchHeaderData();
      fetchFooterData();
    }, []);
  return (
   <div>
    <HeaderComponent logo={logo} navigation={navigation}
    container={hedaerContainer}/>
    <div style={{marginBottom:"20px"}}>
    <CarouselComponent  data={carouselData}/>
    <MainPage data={containerData}/>
  </div>
  <Footer membership={membership} shows={shows} contact={contact}
  footerText={footerText}/>
    </div>
  );
}