import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Calculator from './Calculator'

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('Home');


  const renderPage = () => {
    switch (currentPage) {
      case "Calculator": 
        return <Calculator />
      default:
        return <Calculator />
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      <div>
        {renderPage()}
      </div>
    </div>
  );
}
