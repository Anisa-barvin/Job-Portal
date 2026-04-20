const applicationStatusTemplate = (name, jobTitle, status) => {
  const isAccepted = status === "accepted";

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: ${isAccepted ? "#198754" : "#dc3545"};">
        ${isAccepted ? "Congratulations 🎉" : "Application Update"}
      </h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        ${
          isAccepted
            ? `We are happy to inform you that you have been <strong>selected</strong> for the position of <strong>${jobTitle}</strong>.`
            : `We regret to inform you that your application for <strong>${jobTitle}</strong> was not selected at this time.`
        }
      </p>

      <p>
        ${
          isAccepted
            ? "Our team will contact you soon with next steps."
            : "We encourage you to apply for other opportunities on our platform."
        }
      </p>

      <hr />

      <p style="font-size: 12px; color: #6c757d;">
        Job Portal © ${new Date().getFullYear()}
      </p>
    </div>
  `;
};

export default applicationStatusTemplate;
