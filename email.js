// Initialize EmailJS with your Public Key
(function () {
  emailjs.init("Y-vNDQiFDAVgyECf9"); // Replace with your EmailJS Public Key
})();

function sendConfirmation() {
  const EMAILJS_SERVICE_ID = "service_pucmikh";   // Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = "template_gq5m4g5"; // Replace with your Template ID

  // List of emails to notify
  const recipientEmails = [
    "arslannasir387@gmail.com",
    "rahatmaqsood75@gmail.com"
  ];

  // Send an email to each address
  const sendPromises = recipientEmails.map(email => {
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: email,
      activity: chosenActivity,
      date: "Sunday, August 16, 2026",
      venue: "Observatory Lahore & Butlers Chocolate Cafe"
    });
  });

  Promise.all(sendPromises)
    .then(() => {
      alert("Plan confirmed! Check your inbox for details ❤️");
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      alert("Plan confirmed! Can't wait for Sunday ❤️");
    });
}
