import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connect from '../config/db.js';
import { LOG_DB_NAME } from '../constants.js';
import { getLogById } from '../repositories/logRepository.js';

import { startLogConsumer } from '../lib/logConsumer.js';
import { deleteCronJob } from './deleteCron.js';

(async() => await connect(LOG_DB_NAME))();

startLogConsumer().catch(err => console.log('error in consuming log queue'));


const app = express();

app.get('/log/:logId', async(req, res) => {
    const logId = req?.params?.logId ?? '';
    const result = await getLogById(logId);
    if(!result) {
        res.status(404).json({message: 'logId not found'});
        return;
    }
    res.status(200).json(result);
});

const PORT = process.env.LOG_PORT || 8081;

app.listen(PORT, () => { 
    deleteCronJob();
    console.log(`Log server is running on port ${PORT}`);
});