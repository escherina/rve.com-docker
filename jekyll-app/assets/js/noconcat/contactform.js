var form = document.forms[0];
var fields = form.getElementsByClassName("form_field");
var successMessage = document.getElementsByClassName("contact-form__success")[0];
var failMessage = document.getElementsByClassName("contact-form__fail")[0];
var closeAction = document.getElementsByClassName("contact-form__close")[0];

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData(form);
  var request = new XMLHttpRequest();
  request.open('POST', 'https://formspree.io/rhian.vanesch@gmail.com', true);
  request.setRequestHeader('Accept', 'application/json');
	request.onreadystatechange = function() {
	  if (request.readyState === 4) {
	    if (request.status == 200 && request.status < 300) {
        failMessage.style.display = "none";
        failMessage.style.visibility = "hidden";
        successMessage.style.display = "block";
        failMessage.setAttribute("aria-hidden", "true");
        successMessage.style.visibility = "visible";
        successMessage.setAttribute("aria-hidden", "false");
        for (var i = 0; i < fields.length; i++) {
          fields[i].value = "";
        }
      } else {
        successMessage.style.display = "none";
        successMessage.style.visibility = "hidden";
        successMessage.setAttribute("aria-hidden", "true");
        failMessage.style.display = "block";
        failMessage.style.visibility = "visible";
        failMessage.setAttribute("aria-hidden", "false");
      }
	  }
	}
  request.send(formData);
});

closeAction.addEventListener('click', function() {
    closeAction.parentElement.style.display = "none";
    closeAction.parentElement.style.visibility = "hidden";
    closeAction.parentElement.setAttribute("aria-hidden", "true");
});
