const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const OpenAlbumService = require('./services/inMemory/OpenAlbumServices');


const init = async() => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        options: {
            service: OpenAlbumService,
        }
    })

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();