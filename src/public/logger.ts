import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";
import { LOG_SERVER_URL, NODE_ENV } from "./constants";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "backend" },
  transports: [
    new LokiTransport({
      host: LOG_SERVER_URL || "http://logserver:3100",
      labels: {
        app: "backend",
        service: "backend",
        environment: NODE_ENV || "development",
        job: "backend",
      },
      json: true,
      replaceTimestamp: true,
      level: "info",
      onConnectionError: (err) =>
        console.error("Error al conectar con Loki:", err),
    }),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
