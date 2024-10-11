exports.verifyToken = async (req, res, next) => {
    /**
     * JWT userId
     */

    const module = new UserModule();
    req.user = await module.getRecordById(userId);

    next();
};