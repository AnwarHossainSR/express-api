import { channel, connectRabbitMQ } from '../config/rabbitMQ.js';
import { LOG_QUEUE, LOG_DB_NAME } from '../constants.js';
import connect from '../config/db.js';
import { createLog } from '../repositories/logRepository.js';

export const startLogConsumer = async () => {
    await connect(LOG_DB_NAME);
    await connectRabbitMQ();
    channel.consume(LOG_QUEUE, async (msg) => {
        if (msg !== null) {
            const logData = JSON.parse(msg.content.toString());
            createLog(logData);
            channel.ack(msg);
        }
    });
};