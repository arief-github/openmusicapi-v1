const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { openAlbumModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

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

    async getAlbumById(id) {
        const query = {
            text: ' SELECT * FROM albums WHERE id = $1 ',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }

        return result.rows.map(openAlbumModel)[0];
    }

    async editAlbumById(id, { name, year }) {
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
            values: [name, year, id],
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
    }
}

module.exports = OpenAlbumService;