import Styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={`${Styles.Footer} row bg-dark`}>
      <div className="col-md-3 p-1">
        
        <h5>ABOUT ZOMATO</h5>
        <p>Who We Are</p>
        <p>Blog</p>
        <p>Work With Us</p>
        <p>Investor Relations</p>
        <p>Report Fraud</p>
        <p>Press Kit</p>
        <p>Contact Us</p>
          </div>
          
      <div className="col-md-3 p-2">
        <h5> ZOMAVERSE</h5>
        <p>Zomato</p>
        <p>Blinkit</p>
        <p>Feeding India</p>
        <p>Hyperpure</p>
        <p>Zomaland</p>
      </div>

      <div className="col-md-3 p-2">
        <h5>Partner With Us</h5>
        <p>Apps For You</p>
          </div>
          
      <div className="col-md-2 p-2">
        <h5> LEARN MORE</h5>
        <p>Privacy</p>
        <p>Security</p>
        <p>SiteMap</p>
      </div>

      <div className="col-md-1 p-2">
        
        <h5>Socail Links</h5>
          </div>
          <hr/>
          <div className="wi">
              <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © EShopStore™ Ltd. All rights reserved.</p>
          </div>
      </div>
      
  );
}

export default Footer;
