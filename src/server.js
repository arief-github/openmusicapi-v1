require('dotenv').config();

const Hapi = require('@hapi/hapi');
const openalbums = require('./api/openalbum/');
const OpenAlbumService = require('./services/postgres/OpenAlbumServices');


const init = async() => {
    const openAlbumService = new OpenAlbumService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: openalbums,
        options: {
            service: openAlbumService,
        }
    })

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();