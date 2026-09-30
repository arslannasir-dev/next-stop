(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
})();

function sendConfirmation() {
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your Template ID

  const recipientEmails = [
    "your_email@gmail.com",
    "her_email@gmail.com"
  ];

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
