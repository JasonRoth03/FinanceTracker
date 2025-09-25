import React from 'react';
import Header from './Header.jsx'

/**
 * Simple presentational card used by Login and Register pages.
 * Props:
 * - title: string shown as the card heading
 * - children: form markup
 * - secondaryLabel: optional string for the secondary action button
 * - onSecondaryClick: optional handler for the secondary button
 */
const AuthCard = ({ title, children, secondaryLabel, onSecondaryClick }) => {
  return (
    <div>
  <Header centered />

      <div className="app-container">
        <div className="login-container">
          <h2>{title}</h2>
          <div className="auth-subtitle">Track your expenses — fast and secure</div>
          {children}
          {secondaryLabel && (
            <button className="register-button" onClick={onSecondaryClick} type="button">
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
