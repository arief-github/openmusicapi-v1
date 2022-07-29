const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
    constructor(service) {
        this._service = service;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(req, h) {
        try {

            const { title, year, performer, genre, duration } = req.payload;

            const songId = await this._service.addSong({
                title,
                year,
                performer,
                genre,
                duration
            });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: {
                    songId,
                }
            });

            response.code(201);
            return response;
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
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }

    async getSongsHandler() {
        const songs = await this._service.getSongs();
        return {
            status: 'success',
            data: {
                songs,
            }
        }
    }

    async getSongByIdHandler(req, h) {
        try {

            const { id } = req.params;
            const song = await this._service.getSongById(id);
            return {
                status: 'success',
                data: {
                    song,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // SERVER ERROR
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }

    async putSongByIdHandler(req, h) {
        try {
            const { id } = req.params;
            const {
                title,
                year,
                genre,
                performer,
                duration = null,
            } = req.payload;

            await this._service.editSongById(id, { title, year, genre, performer, duration })

            return {
                status: 'success',
                message: 'Musik berhasil diperbarui',
            }
        } catch (error) {
            if(error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                })
                response.code(error.statusCode);
                return response;
            }
        }

        const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kesalahan pada server',
        });
        response.code(500);
        return response;
    }

    async deleteSongByIdHandler(req, h) {
        try {

            const { id } = req.params;
            await this._service.deleteSongById(id);

            return {
                status: 'success',
                message: 'Musik berhasil dihapus',
            }

        } catch(error) {
            if(error instanceof ClientError) {
                const response = h.response({
                    status:'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        }

        const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kesalahan pada server'
        });
        response.code(500);
        return response;
    }
}

module.exports = SongsHandler;