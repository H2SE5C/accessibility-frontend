import { useEffect, useRef } from "react";

function Loading({ isLoading, children }) {
  const laadRef = useRef();

  useEffect(() => {
    if(laadRef.current) {
      laadRef.current.focus();
    }
  })
  return (
    <>
      {isLoading ? (
        <p aria-live='assertive' ref={laadRef} tabIndex={0}>Laden... Wees geduldig.</p>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
}

export default Loading;