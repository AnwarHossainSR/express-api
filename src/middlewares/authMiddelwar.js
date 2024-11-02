import jwt from 'jsonwebtoken';
import { getUserById } from '../repositories/userRepository.js';
import { logError } from '../lib/logProducer.js';

export const authMiddleware = async (req, res, next) => {
    const logId = req?.logId;
    try {
        const authHeader = req?.headers?.authorization ?? '';       
        if(!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')) {
            logError(logId, 'Authentication information not available', {authHeader});
            return res.status(401).json({ message: 'not authorized to access this resource', logId });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken?.userId ?? '';
        if (!userId) {
            logError(logId, 'Authentication information not available', {authHeader});
            return res.status(401).json({ message: 'not authorized to access this resource', logId });
        }
        const user = await getUserById(userId);
        req.user = user;
        
        next();
    } catch (error) {
        logError(logId, 'Authentication information not available', error);
        return res.status(401).json({ message: 'not authorized to access this resource', logId });
    }
};