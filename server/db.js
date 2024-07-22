import { Pool } from "pg";
<<<<<<< HEAD
=======

>>>>>>> b9b839a (fix code according to feedback)
import config from "./utils/config";
import logger from "./utils/logger";

const localDb = ["0.0.0.0", "127.0.0.1", "localhost"].includes(
	new URL(config.dbUrl).hostname
);

const pool = new Pool({
	connectionString: config.dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: localDb ? false : { rejectUnauthorized: false },
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		logger.error("%O", err);
		process.exit(1);
	}
	logger.info("Postgres connected to %s", client.database);
	client.release();
};

export const disconnectDb = () => pool.end();

<<<<<<< HEAD
export default{
	query: (text, params) => {
		logger.debug("Postgres querying %O", { text, params });
		return pool.query(text, params);
=======
/**
 * Access this with `import db from "path/to/db";` then use it with
 * `await db.query("<SQL>", [...<variables>])`.
 */
export default {
	query: (...args) => {
		logger.debug("Postgres querying %O", args);
		return pool.query.apply(pool, args);
>>>>>>> b9b839a (fix code according to feedback)
	},
};
