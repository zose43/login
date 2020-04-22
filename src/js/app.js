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
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    //*show error notify
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}
