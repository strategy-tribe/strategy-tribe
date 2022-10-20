function LOG(msg) {
  const logger = Moralis.Cloud.getLogger();
  logger.info(`----> ${msg}`);
}

/**
 * @param {string} msg message to send
 * @param {boolean} shouldThrow default = `true`
 *
 */
function ERROR(msg, shouldThrow = true) {
  LOG(`Error : ${msg}`);
  const logger = Moralis.Cloud.getLogger();
  logger.error(`XXXX ----> ${msg}\nThrowing: ${shouldThrow}`);
  if (shouldThrow) throw new Error(msg);
}
