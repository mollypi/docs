import React from 'react';

function CTA() {
  return (
    <div className="cta">
      <div className="container">
        <img
          src="/img/icon-primary.svg"
          alt="Infracost icon"
          width={100}
          height={100}
        />
        <p className="action">Download and try Infracost now</p>
        <a href="/docs" className="button primary">
          Get started
        </a>
      </div>
    </div>
  );
}

export default CTA;
