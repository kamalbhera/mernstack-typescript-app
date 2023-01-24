import winston, { format, transports as wts } from 'winston';

const consoleTransport = new wts.Console({
  level: 'debug',
  format: format.combine(
    format.label({ label: 'questionnaires' }),
    format.timestamp(),
    format.colorize(),
    format.printf((info) => {
      const { timestamp, label, level, message, ...rest } = info;
      const base = `${timestamp} [${label}] ${level}: ${message}`;
      if (Object.keys(rest).length) {
        return `${base}\nmeta = ${JSON.stringify(rest, null, 2)}`;
      }
      return base;
    }),
  ),
});

const transports: winston.transport[] = [consoleTransport];

export const winstonTransports = transports;
