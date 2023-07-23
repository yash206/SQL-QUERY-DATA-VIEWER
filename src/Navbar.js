import React from 'react'

export default function Navbar() {

    // Handler for clicking on anchor links to scroll to sections
    const handleAnchorLinkClick = (e, target) => {
        e.preventDefault();
        document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
    });
  };

  return (
    <nav className="app-nav">
          <ul>
            <li>
              <a
                href="#query-selector"
                onClick={(e) => handleAnchorLinkClick(e, '#query-selector')}
              >
                Select Query
              </a>
            </li>
            <li>
              <a
                href="#data-display"
                onClick={(e) => handleAnchorLinkClick(e, '#data-display')}
              >
                Displayed Data
              </a>
            </li>
          </ul>
        </nav>
  )
}

