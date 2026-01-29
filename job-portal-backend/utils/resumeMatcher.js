export const calculateMatch = (jobSkills, resumeSkills) => {
  if (!jobSkills || !resumeSkills) return { percentage: 0, matched: [] };

  const jobArray = jobSkills
    .toLowerCase()
    .split(",")
    .map((s) => s.trim());

  const resumeArray = resumeSkills
    .toLowerCase()
    .split(",")
    .map((s) => s.trim());

  const matched = jobArray.filter((skill) =>
    resumeArray.includes(skill)
  );

  const percentage = Math.round(
    (matched.length / jobArray.length) * 100
  );

  return {
    percentage,
    matched,
  };
};
