const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { openAlbumModel } = require('../../utils');

class OpenAlbumService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
            values: [id, name, year],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new Error('Album gagal ditambahkan')
        }

        return result.rows[0].id;
    }

    async getAlbum() {
        const result = await this._pool.query('SELECT * FROM albums');
        return result.rows;
    }
}

module.exports = OpenAlbumService;