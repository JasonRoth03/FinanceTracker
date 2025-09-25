import React from 'react';

/**
 * Shared header used by Dashboard and auth pages.
 * Props:
 * - onLogout: optional function, if provided a Logout button is shown
 */
const Header = ({ onLogout, centered = false }) => {
  const headerEl = (
    <header>
      <h1>FinanceTracker</h1>
      <div className="header-actions">
        <a
          className="auth-link"
          href="https://www.linkedin.com/in/jasonzel/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Jason's LinkedIn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5z" fill="currentColor"/>
            <path d="M0 8.5h5v15H0zM8 8.5h4.8v2.1h.1c.7-1.3 2.4-2.6 5-2.6 5.4 0 6.4 3.6 6.4 8.2v9.3H19V16c0-2.4 0-5.5-3.4-5.5-3.4 0-3.9 2.6-3.9 5.3v7.4H8V8.5z" fill="currentColor"/>
          </svg>
        </a>

        <a
          className="auth-link"
          href="https://github.com/JasonRoth03"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Jason's GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.44-3.88-1.44-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.45-2.71 5.42-5.29 5.71.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" fill="currentColor"/>
          </svg>
        </a>

        {onLogout && (
          <button onClick={onLogout}>Logout</button>
        )}
      </div>
    </header>
  );

  if (centered) {
    return (
      <div className="auth-header">
        {headerEl}
      </div>
    );
  }

  return headerEl;
};

export default Header;
