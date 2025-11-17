export const greetingMessage = () => {
  const now = new Date();
  const hours = now.getHours(); // local time hours (0–23)

  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
};
