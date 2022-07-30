require('dotenv').config();

const Hapi = require('@hapi/hapi');
const openalbums = require('./api/openalbum/');
const openmusics = require('./api/openmusic/');
const OpenAlbumService = require('./services/postgres/OpenAlbumServices');
const OpenMusicsService = require('./services/postgres/OpenMusicServices');
const AlbumValidator = require('./validator/album');
const SongsValidator = require('./validator/music');

const init = async () => {
    const openAlbumService = new OpenAlbumService();
    const openMusicsService = new OpenMusicsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register(
        [
            {
                plugin: openalbums,
                options: {
                    service: openAlbumService,
                    validator: AlbumValidator,
                }
            },
            {
                plugin: openmusics,
                options: {
                    service: openMusicsService,
                    validator: SongsValidator,
                }
            }

        ]
    );
    
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();