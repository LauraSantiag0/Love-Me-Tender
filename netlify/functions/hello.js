import logger from "../../server/utils/logger";

export const handler = async (event, context) => {
  logger.debug("Welcoming everyone...");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world!" }),
  };
};
