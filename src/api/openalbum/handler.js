const ClientError = require("../../exceptions/ClientError");

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumHandler = this.getAlbumHandler.bind(this);
    }

    async postAlbumHandler(req, h) {
        const { name = 'untitled', year } = req.payload;

        const albumId = await this._service.addAlbum({ name, year });

        const response = h.response({
            status: 'success',
            message: 'album berhasil ditambahkan',
            data: {
                albumId,
            }
        })

        response.code(201);
        return response;
    }

    async getAlbumHandler() {
        const album = await this._service.getAlbum();
        return {
            status: 'success',
            data: {
                album
            }
        }
    }
}

module.exports = AlbumsHandler;