const checkAccessTokenMiddleware = (req, res, next) => {
    const accessTokenHeader = req.headers['authorization'];

    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) {
        console.log('Token de acesso ausente ou inválido.')
        return res.status(401).json({ message: 'Token de acesso ausente ou inválido.' });
    }

    const accessToken = accessTokenHeader.split(' ')[1];
    req.accessToken = accessToken;
    next();
};

module.exports = {
    checkAccessTokenMiddleware
};
