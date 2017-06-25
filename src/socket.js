const { NODE_ENV, PORT } = process.env;
const { hostname, protocol } = location;

const isNotProd = NODE_ENV !== 'production';
const isDev = NODE_ENV === 'development';

const port = isNotProd ? PORT || (isDev ? 3001 : 3000) : '';
const secure = protocol === 'https:' ? 's' : '';
const url = `ws${secure}://${[hostname, port].join(':')}/dungeon`;

const ws = new WebSocket(url);
export default ws;
