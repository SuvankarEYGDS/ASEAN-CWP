import React from 'react';


const Footer = (props) => {
  const { membership,contact,shows,footerText } = props;
  const membershipData = membership[":items"];
  const contactData = contact[":items"];
  const showsData = shows[":items"];
  return (
   
    <footer className="text-center text-lg-start bg-light text-muted" >
      <section style={{marginTop:"5px"}}>
        <div className="container text-center text-md-start mt-5">
         
          <div className="row mt-3">
          
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <a  href={`http://localhost:4502${membershipData && membershipData.title.linkURL}`}>
              {membershipData && membershipData.title.text}
              </a>
              </h6>
              {
               membershipData && membershipData.navigation.items.map((item)=>{
                return (  <p>
                  <a href={`http://localhost:4502${item.url}`} className="text-reset">{item.title}</a>
                </p>)
                })
              }
             
            </div>
         
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
            <a  href={`http://localhost:4502${showsData && showsData.title.linkURL}`}>
            {showsData && showsData.title.text}
            </a>
            </h6>
            {
             showsData && showsData.navigation.items.map((item)=>{
              return (  <p>
               <a href={`http://localhost:4502${item.url}`} className="text-reset">{item.title}</a>
              </p>)
               })
            }
           
          </div>
          
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
          <a href={`http://localhost:4502${contactData && contactData.title.linkURL}`}>
            {contactData && contactData.title.text}
            </a>
          </h6>
            
            {
             contactData && contactData.navigation.items.map((item)=>{
              return (  <p>
              <a href={`http://localhost:4502${item.url}`} className="text-reset">{item.title}</a>
              </p>)
              })
            }
           
          </div>
         
            {/* <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
             
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div> */}
          
          </div>
         
        </div>
      </section>
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      
        <div className="me-5 d-none d-lg-block">
         
        </div>
      
        <div>
        <span>Get connected with us on social networks</span> &nbsp;
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
        
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      
      </section>
      <div className="text-center p-4" style={{backgroundColor: '#ccc'}} dangerouslySetInnerHTML={{ __html: footerText }}>  
      </div>
     
    </footer>
   
  );
};

export default Footer;