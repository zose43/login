import "../css/style.css";
import "bootstrap/dist/css/bootstrap.css";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

//**Events

//**Form */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

//**Input */
inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

//**Handlers

async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      removeInputError(el);
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) {
    return;
  }

  try {
    await login(inputEmail.value, inputPassword.value);
    form.reset();
    //*show success notify
  } catch (err) {
    //*show error notify
  }
}

notify({
  mas: "some notification!!",
  className: "alert-primary",
});

notify({
  mas: "some notification 3",
  className: "alert-danger",
});
notify({
  mas: "some notification 2",
  className: "alert-primary",
});
notify({
  mas: "some notification 1",
  className: "alert-warning",
});
notify({
  mas: "some notification 0",
  className: "alert-danger",
});
