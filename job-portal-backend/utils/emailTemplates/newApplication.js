const newApplicationTemplate = (jobTitle, applicantName) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #0d6efd;">New Application Received 📥</h2>

      <p>
        <strong>${applicantName}</strong> has applied for your job posting:
      </p>

      <p style="font-size: 18px;">
        <strong>${jobTitle}</strong>
      </p>

      <p>
        Please login to your recruiter dashboard to review the application.
      </p>

      <hr />

      <p style="font-size: 12px; color: #6c757d;">
        Job Portal Notification
      </p>
    </div>
  `;
};

export default newApplicationTemplate;
