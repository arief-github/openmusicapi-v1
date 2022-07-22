const { nanoid } = require('nanoid');

class OpenAlbumService {
    constructor() {
        this._openAlbum = [];
    }

    addAlbum({ name, year }) {
        const id = nanoid(16);

        const newAlbum = {
            id,
            name,
            year,
        };

        this._openAlbum.push(newAlbum);

        const isSuccess = this._openAlbum.filter((album) => album.id === id).length > 0;

        if (!isSuccess) {
            throw new Error('Catatan Gagal ditambahkan')
        }

        return id;
    }

    getAlbum() {
        return this._openAlbum;
    }
}

module.exports = OpenAlbumService;