function Loading({ isLoading, children }) {
  return (
    <div>
      {isLoading ? (
        <p aria-live='assertive'>Laden... Wees geduldig.</p>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export default Loading;