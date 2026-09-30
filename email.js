// Initialize EmailJS with your Public Key
if (window.emailjs) emailjs.init("Y-vNDQiFDAVgyECf9");

async function sendConfirmation() {
  const form = document.getElementById('datePlanner');
  const button = document.getElementById('confirmBtn');
  const status = document.getElementById('confirmationStatus');
  if (button.disabled) return;
  const stops = [
    ['breakfast', 'Breakfast'], ['shooting', 'Shooting range'],
    ['shopping', 'Shopping'], ['dinner', 'Dinner date']
  ];
  let previousTime = '';
  for (const [key] of stops) {
    const input = form.elements[key + 'Time'];
    input.setCustomValidity('');
    if (input.value && previousTime && input.value <= previousTime) {
      input.setCustomValidity('Choose a time after the previous activity, or leave it open.');
    }
    if (input.value) previousTime = input.value;
  }
  if (!form.reportValidity()) return;
  const plan = stops.map(([key, label]) => {
    const rawTime = form.elements[key + 'Time'].value;
    let time = 'Time to decide together';
    if (rawTime) {
      const [hours, minutes] = rawTime.split(':');
      time = `${Number(hours) % 12 || 12}:${minutes} ${Number(hours) >= 12 ? 'PM' : 'AM'}`;
    }
    const place = form.elements[key + 'Place'].value.trim() || 'Place to decide together';
    return `${label}: ${time} — ${place}`;
  }).join('\n');
  const attire = form.elements.dinnerOutfit.value;
  if (!window.emailjs) {
    status.textContent = 'The email service could not load. Your choices are still here; please refresh when your connection is back.';
    return;
  }
  button.disabled = true;
  button.textContent = 'Sending our plan…';
  status.textContent = '';
  const EMAILJS_SERVICE_ID = "service_pucmikh";   // Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = "template_gq5m4g5"; // Replace with your Template ID

  // List of emails to notify
  const recipientEmails = [
    "arslannasir387@gmail.com",
    "rahatmaqsood75@gmail.com"
  ];

  // Send an email to each address
  const sendPromises = recipientEmails.map(async email => {
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: email,
      activity: `${chosenActivity}\nDinner outfit: ${attire}`,
      date: "Sunday, October 11, 2026",
      venue: plan,
      itinerary: plan,
      dinner_attire: attire
    });
  });

  try {
    const results = await Promise.allSettled(sendPromises);
    const sent = results.filter(result => result.status === 'fulfilled').length;
    status.textContent = sent === recipientEmails.length
      ? 'Our plan has been sent to both inboxes. A Sunday to look forward to! 🤎'
      : sent > 0
        ? 'The plan reached one inbox, but the other email failed. Retrying will send to both again.'
        : 'The emails could not be sent. Your choices are still here — please try again.';
  } catch (error) {
    status.textContent = 'The emails could not be sent. Please try again.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send Our Little Plan 🤎';
  }
}
