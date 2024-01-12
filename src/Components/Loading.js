import React from 'react';

function Loading({ isLoading, children }) {
  return (
    <div>
      {isLoading ? (
        <p>Laden...</p>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export default Loading;