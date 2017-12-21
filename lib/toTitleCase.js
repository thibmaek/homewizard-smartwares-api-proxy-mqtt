/**
 * Formats a string to title case (e.g John Smith)
 * @param  {String} str given string to format
 * @return {String} the formatted string
 */
module.exports = str => {
  return str.toLowerCase().replace(/^(.)|\s(.)/g, f => f.toUpperCase());
}