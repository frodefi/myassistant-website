const nameInput = document.getElementById("name");
const telefonnummerInput = document.getElementById("telefonnummer");
const callbackButton = document.getElementById("callback_button");
const form = document.getElementById("form");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup__message");
const popupButton = document.getElementById("popup__button");

popupButton.addEventListener("click", () => {
  hidePopup();
});

telefonnummerInput.addEventListener("input", function () {
  if (telefonnummerInput.value.length >= 5) {
    callbackButton.disabled = false;
    callbackButton.classList.remove("button-disabled");
  } else {
    callbackButton.disabled = true;
    callbackButton.classList.add("button-disabled");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (telefonnummerInput.value.length >= 5) {
    const phoneNumber = telefonnummerInput.value;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    callbackButton.disabled = true;
    callbackButton.classList.add("button-disabled");
    var params = {
      user_name: nameInput.value || "",
      user_phone: telefonnummerInput.value,
    };

    const serviceID = "service_8wyi8x2";
    const templateID = "template_2w8nqvk";
    emailjs
      .send(serviceID, templateID, params)
      .then(() => {
        nameInput.value = "";
        telefonnummerInput.value = "";
        popupMessage.textContent = `Takk! Du vil snart blir kontaktet på ${phoneNumber}.`;
        showPopup();
      })
      .catch(() => {
        popupMessage.textContent = `Noe gikk galt! Vennligst prøv igjen senere.`;
        showPopup();
      });
  }
});

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
}

function showPopup() {
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}
