function ResumePreviewModal({ resumeUrl, onClose }) {
  if (!resumeUrl) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Resume Preview</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body" style={{ height: "80vh" }}>
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          </div>

          <div className="modal-footer">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              Download PDF
            </a>

            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResumePreviewModal;
