function MapBlur() {
  return (
    <div
      className="z-10"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "12%",
        height: "100%",
        background:
          "linear-gradient(to left, rgba(234,234,234,0) 0%, rgba(234,234,234,1) 100%)",
        pointerEvents: "none", // Ensures the overlay doesn't intercept mouse events
      }}
    ></div>
  );
}

export default MapBlur;
