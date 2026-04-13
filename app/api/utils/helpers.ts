export const uploadToCloudflare = async (file: File) => {
  const formData = new FormData();

  const blob = new Blob([file]);
  formData.append("file", blob, file.name);

  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
      body: formData,
    },
  );

  return result.json();
};

export function startOfToday() {
  const today = new Date();

  // Set the time to midnight (00:00:00.000)
  today.setHours(0, 0, 0, 0);

  return today;
}
export function startOfWeekLocal() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, etc.
  const diff = today.getDate() - dayOfWeek; // Calculate the difference to the first day of the week

  // Set the date to the calculated first day
  today.setDate(diff);
  // Set the time to midnight
  today.setHours(0, 0, 0, 0);

  return today;
}

export function startOfMonth() {
  const today = new Date();

  // Set the date to the 1st day of the current month
  today.setDate(1);

  // Set the time to midnight (00:00:00.000)
  today.setHours(0, 0, 0, 0);

  return today;
}

export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);

  return newDate;
}
