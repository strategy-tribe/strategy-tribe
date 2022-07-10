function LOG(msg) {
  const logger = Moralis.Cloud.getLogger();
  logger.info(`----> ${msg}`);
}

function ERROR(msg, shouldThrow = false) {
  const logger = Moralis.Cloud.getLogger();
  logger.error(`XXXX ----> ${msg}\nThrowing: ${shouldThrow}`);
  if (shouldThrow) throw msg;
}
