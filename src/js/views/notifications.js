function getNotifyContainer() {
  return document.querySelector(".notify-container");
}

function alertTemplate(msg, className, index) {
  return `
        <div class='alert ${className}' data-index='${index}'>${msg}</div>
    `;
}

function getAlertIndex() {
  return document.querySelectorAll(".notify-container .alert").length;
}

function templateNotifyContainer() {
  return `
        <div class='notify-container' style='position: fixed; top: 7px; right: 7px; z-index: 99;'></div>
    `;
}

function createNotifyContainer() {
  const template = templateNotifyContainer();
  document.body.insertAdjacentHTML("afterbegin", template);
}

/**
 * function notify. Show notification message
 * @param {Object} settings
 * @param {String} settings.msg
 * @param {String} settings.className
 * @param {Number} settings.timeout
 */
export function notify({
  msg = "Info message",
  className = "alert-info",
  timeout = 2000,
} = {}) {
  if (!getNotifyContainer()) {
    return createNotifyContainer();
  }

  const index = getAlertIndex();
  const template = alertTemplate(msg, className, index);
  const container = getNotifyContainer();
  container.insertAdjacentHTML("beforeend", template);
}
