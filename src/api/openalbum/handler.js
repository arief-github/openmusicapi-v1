const ClientError = require("../../exceptions/ClientError");

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumHandler = this.getAlbumHandler.bind(this);
    }

    async postAlbumHandler(req, h) {
        try {
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
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'error',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(400);
            console.error(error);
            return response;
        }

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