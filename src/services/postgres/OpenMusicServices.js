const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { openMusicModel } = require('../../utils');

class OpenMusicsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({
        title,
        year,
        performer,
        genre,
        duration
    }) {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
        }
        console.log(query.values);
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs() {
        const result = await this._pool.query('SELECT id, title, performer, FROM songs');
        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            valuse: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return result.rows.map(openMusicModel)[0];
    }

    async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
            text: "UPDATE songs SET title=$1, year=$2, genre=$3, performer=$4, duration=$5 WHERE id=$6 RETURNING id",
            values: [title, year, genre, performer, duration, id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui musik, Id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Musik gagal dihapus, Id tidak ditemukan');
        }
    }
}

module.exports = OpenMusicsService;