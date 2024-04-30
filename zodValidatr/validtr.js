

const validate = (schema) => async (req, res, next) => {
    //the schema is a asignUpSchema:)

    try {
        const parse = await schema.parseAsync(req.body)
        req.body = parse
        next();

    } catch (error) {
        // const status=422;
        // const message='Fill input fil  properly'
        const err = error.issues[0].message
        // const errror={status,err,message}
        res.status(401).json({ msg: err })
        // next(errror)
    }
}
module.exports = validate