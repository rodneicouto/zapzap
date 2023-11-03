import { createServer } from 'http';
import app from '../app.js'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = createServer(app);
server.listen(port);
console.log( 'run on port ' + port );