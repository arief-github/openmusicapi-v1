const { nanoid } = require('nanoid');
const openalbum = require('./index');

const addAlbumHandler = (req, h) => {
    const { name = 'untitled', year } = req.payload;
    const id = nanoid(16);

    const newAlbumEntry = { name, year };

    openalbum.push(newAlbumEntry);

    const isSuccess = openalbum.filter((album) => album.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Album berhasil ditambahkan',
            data: {
                albumId: id,
            }
        })

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Album gagal ditambahkan',
    })

    response.code(500);
    return response;

}

const getAllAlbumHandler = () => ({
    status: 'success',
    data: {
        openalbum,
    },
})

const getAlbumByIdHandler = () => {

}

const editAlbumByIdHandler = () => {

}

const deleteAlbumHandler = () => {

}

module.exports = {
    addAlbumHandler,
    getAllAlbumHandler,
    getAlbumByIdHandler,
    editAlbumByIdHandler,
    deleteAlbumHandler,
};