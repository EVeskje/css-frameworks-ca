/**
 * Creates an HTML message element.
 * @param {string} [type="error"] - The type of the message.
 * @param {string} [message="Ooops! An error has occurred."] - The message content.
 * @returns {string} - The generated HTML message string.
 * @example
 * const errorMessage = createMessage("error", "This is an error message.");
 * document.body.innerHTML = errorMessage;
 */
export function createMessage(
 type = "error",
 message = "Ooop! An error has occurred."
) {
 // Return the generated HTML message string using template literal
 return `<div class="message ${type}">${message}</div>`;
}
