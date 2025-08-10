// Safely parse JSON, fallback to empty array
function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

// Convert arrays or JSON strings to JSON string for DB storage
function toJsonString(field) {
  if (Array.isArray(field)) return JSON.stringify(field);
  try {
    return JSON.stringify(JSON.parse(field));
  } catch {
    return JSON.stringify([]);
  }
}

module.exports = {
  safeJsonParse,
  toJsonString,
};