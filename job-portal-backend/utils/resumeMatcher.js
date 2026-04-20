export const calculateMatch = (jobSkills, userSkills) => {
  if (!jobSkills || !userSkills) return { percentage: 0 };

  const jobArray = jobSkills.toLowerCase().split(",").map(s => s.trim());
  const userArray = userSkills.toLowerCase().split(",").map(s => s.trim());

  const matched = jobArray.filter(skill =>
    userArray.includes(skill)
  );

  const percentage = Math.round(
    (matched.length / jobArray.length) * 100
  );

  return { percentage };
};
