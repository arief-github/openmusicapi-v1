const routes = require('./routes');
const AlbumsHandler = require('./handler');

module.exports = {
	name: 'albums',
	version: '1.0.0',
	register: async (server, { service }) => {
		const albumsHandler = new AlbumsHandler(service);
		server.route(routes(albumsHandler));
	}
}