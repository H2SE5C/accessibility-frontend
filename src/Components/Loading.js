import { useEffect, useRef } from "react";

function Loading({ isLoading, children }) {
  const laadRef = useRef();

  useEffect(() => {
    if(laadRef.current) {
      laadRef.current.focus();
    }
  })
  return (
    <div>
      {isLoading ? (
        <p aria-live='assertive' ref={laadRef} tabIndex={0}>Laden... Wees geduldig.</p>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export default Loading;