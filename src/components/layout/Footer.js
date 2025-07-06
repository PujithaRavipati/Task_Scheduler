import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p align= "center">&copy; {new Date().getFullYear()} Task Scheduler || Built by Pujitha Ravipati</p>
      </div>
    </footer>
  );
};

export default Footer;