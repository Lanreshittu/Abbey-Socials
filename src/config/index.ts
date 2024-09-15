import { config } from "dotenv";
config({ path: ".env" });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN} = process.env
export const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PORT} = process.env