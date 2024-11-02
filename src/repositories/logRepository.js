import Log from './schemas/logSchema.js';

export const createLog = async (logData) => {
    const log = new Log(logData);
    await log.save();
};

export const getLogById = async (logId) => {
    const log = await Log.find( { logId }).sort( { createdAt: 1 });
    if (!log) {
        return null;
    }
    return log;
};

export const deleteLogs = () => {
    return Log.deleteMany({});
};