function Spinner({ message = "Loading..." }) {
  return (
    <div className="d-flex flex-column align-items-center my-5">
      <div className="spinner-border text-primary mb-2" role="status"></div>
      <span className="text-muted">{message}</span>
    </div>
  );
}

export default Spinner;
