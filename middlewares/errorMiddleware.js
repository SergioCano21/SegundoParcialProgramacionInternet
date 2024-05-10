const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode :500;
    res.json({
        message: err.message,
        error: err.message ? true : false,
        stack: process.env.NODE_ENV === 'production' ? null: err.stack
    })
}
module.exports = {
    errorHandler
}