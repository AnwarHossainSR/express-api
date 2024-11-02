export const removeHeaders = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
};