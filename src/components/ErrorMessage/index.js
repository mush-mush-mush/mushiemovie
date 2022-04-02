import React from 'react';
import './errorMessage.scss';

function ErrorMessage({ error, resetError }) {
  return (
    <div className="error">
      <div className="error-dialog">
        <i class="fas fa-exclamation-circle"></i>
        <div className="error-dialog__body">
          <h1 className="error-dialog__body-title">Something went wrong</h1>
          <p className="error-dialog__body-text">{error}</p>
        </div>
        <button className="error-dialog__button" onClick={resetError}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
