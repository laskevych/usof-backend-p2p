class Controller {
    _model;
    _validationRules = [];
    _accessRules = [];

    constructor(model, validationRules = []) {
        this._model = model;
        this._validationRules = validationRules;
    }

    async getAll(req, res) {
        // Access Rule By Role

        const entities = await this._model.getRecords();

        return res.status(200).json({
            data: entities.map(entity => entity.getLikeObject()),
        });
    }

    async getById(req, res) {
        // Access Rule By Role

        const entity = await this._model.getRecordById(req.params.id);

        if (!entity) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        return res.status(200).json({
            data: entity.getLikeObject()
        });
    }

    async create(req, res) {
        const newEntity = this._model.createEntity(req.body);
        await newEntity.save();

        return res.status(201).json({
            data: newEntity.getLikeObject(),
        });
    }

    async validate(req, res, next) {
        //TODO: this._validationRules
        //res.status(401)

        next();
    }
}

module.exports = Controller;