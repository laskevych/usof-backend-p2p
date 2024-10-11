class Entity {
    _model;

    /**
     * @param module
     * @param data
     */
    constructor(module, data = {}) {
        this._model = module;
        if (data) {
            for (const key in data) {
                if (this._model._fields.includes(key)) {
                    this[key] = data[key];
                }
            }
        }
    }

    async save() {
        const fields = Object.keys(this)
            .filter(key => this._model._fields.includes(key));
        const values = fields
            .map(field => this[field]);

        if (this.id) {
            const parameters = fields.map(field => `${field} = ?`).join(', ');

            await this._model._dbConnection.query(
                `UPDATE ${this._model._table} SET ${parameters} WHERE id = ?`,
                [...values, this.id]
            );
        } else {
            const parameters = fields.join(', ');
            const placeholders = fields.map(() => '?').join(', ');

            const [result] = await this._model._dbConnection.query(
                `INSERT INTO ${this._model._table} (${parameters}) VALUES (${placeholders})`,
                values
            );

            this.id = result.insertId;
        }
    }

    async delete() {
        if (this.id) {
            await this._model._dbConnection.query(
                `DELETE FROM ${this._model.table} WHERE id = ?`, [this.id]
            );
        }
    }

    getLikeObject() {
        const result = {};

        this._model._fields.forEach(field => {
            if (
                this[field] !== undefined
            ) {
                result[field] = this[field]
            }
        });

        return result;
    }

}

module.exports = Entity;