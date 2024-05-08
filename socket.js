// Import the required modules
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for when a client connects
wss.on('connection', function connection(ws, req) {
    let date_time = new Date();
    
    // Creating a unique connection ID to track logs
    const connectionId = uuidv4();
    var logger_id = "["+connectionId+"] "
    console.log(logger_id, 'Client connected at ', date_time.toISOString());

    var possible_user_agent = req.headers['user-agent'] || 'Unkown User-Agent';
    var possible_host = req.headers['host'] || 'Unkown Host';    
    // Trying to determine what is the origin of the connection
    console.log(logger_id, 'Host: ', possible_host)
    console.log(logger_id, 'User-Agent: ', possible_user_agent)

    ws.on('message', function incoming(message) {
        console.log(logger_id, 'Message Received:', message.toString());
    });

    ws.on('close', function close() {
        console.log(logger_id, 'Client disconnected');
    });
});

console.log('WebSocket server is listening on port 8080');
