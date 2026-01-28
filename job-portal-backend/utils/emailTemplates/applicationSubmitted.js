const applicationSubmittedTemplate = (name, jobTitle) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #0d6efd;">Application Submitted Successfully 🎉</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Your application for the position of 
        <strong>${jobTitle}</strong> has been submitted successfully.
      </p>

      <p>
        Our team will review your profile and get back to you soon.
      </p>

      <hr />

      <p style="font-size: 12px; color: #6c757d;">
        This is an automated email from Job Portal. Please do not reply.
      </p>
    </div>
  `;
};

export default applicationSubmittedTemplate;
