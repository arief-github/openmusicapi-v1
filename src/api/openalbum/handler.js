const ClientError = require("../../exceptions/ClientError");

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler(req, h) {
        try {
            this._validator.validateAlbumPayload(req.payload);
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
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                console.log(error);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getAlbumByIdHandler(req, h) {
        try {
            const { id } = req.params;
            const album = await this._service.getAlbumById(id);

            const response = h.response({
                status: 'success',
                data: {
                    album,
                },
            });

            response.code(200);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server',
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }

    async putAlbumByIdHandler(req, h) {
        try {
            this._validator.validateAlbumPayload(req.payload);
            const { id } = req.params;
            const { name, year } = req.payload;

            await this._service.editAlbumById(id, { name, year });

            return {
                status: 'success',
                message: 'Album berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                })

                response.code(error.statusCode);
                return response;
            }

            // SERVER ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            })
            response.code(500);
            console.log(error);
            return response;
        }
    }

    async deleteAlbumByIdHandler(req, h) {
        try {

            const { id } = req.params;

            await this._service.deleteAlbumById(id);

            return {
                status: 'success',
                message: 'Album berhasil dihapus',
            }

        } catch(error) {
            if(error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                })
                response.code(error.statusCode);
                return response;
            }

            // SERVER ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }
}

module.exports = AlbumsHandler;