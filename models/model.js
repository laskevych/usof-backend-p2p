const connection = require('./db');
const Entity = require('./entity');

class Model {
    _dbConnection;
    _table;
    _fields;
    _entityClass = Entity;

    /**
     * @param {string} table
     * @param {[string]} fields
     */
    constructor(table, fields = ['id'], entityClass) {
        this._table = table;
        this._fields = fields;
        this._dbConnection = connection;
        if (entityClass) {
            this._entityClass = entityClass;
        }
    }

    async getRecords(where = [], orderBy = 'id', limit = undefined, offset = undefined) {
        let whereCondition = '';
        where.forEach(item => {
            if (whereCondition.length === 0) {
                whereCondition = 'WHERE ';
            }

            whereCondition += `${item.field} ${item.condition} ${item.value}`;
        });

        let orderByCondition = '';
        if (orderBy) {
            orderByCondition = `ORDER BY ${orderBy}`
        }

        let limitCondition = '';
        if (limit) {
            limitCondition = `LIMIT ${limit}`
        }

        const query = `
            SELECT
               ${this._fields.join(',')}
            FROM
                ${this._table}
            ${whereCondition}
            ${orderByCondition}
            ${limitCondition}
        `;

        console.log(query);

        const [records] = await this._dbConnection.query(query);

        return records.map(record => {
            return this.createEntity(record)
        });
    }

    async getRecordById(id) {
        const [record] = await this.getRecords(
            [{
                field: 'id',
                condition: '=',
                value: id
            }],
            'id',
            1
        );

        return record;
    }

    createEntity(data) {
        return new this._entityClass(this, data);
    }
}

module.exports = Model;