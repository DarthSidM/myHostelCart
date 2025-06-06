// This module manages verified phone numbers with a TTL (time-to-live) feature.
const verifiedNumbers = new Map();

function addVerifiedNumber(phoneNumber, ttlInMinutes = 10) {
  verifiedNumbers.set(phoneNumber, true);

  // Set expiry (auto-delete after TTL)
  setTimeout(() => {
    verifiedNumbers.delete(phoneNumber);
  }, ttlInMinutes * 60 * 1000); // convert minutes to ms
}

function isVerified(phoneNumber) {
  return verifiedNumbers.has(phoneNumber);
}

function removeVerified(phoneNumber) {
  verifiedNumbers.delete(phoneNumber);
}

module.exports = {
  addVerifiedNumber,
  isVerified,
  removeVerified,
};
