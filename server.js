var grpc = require('grpc');

var greeterProto = grpc.load('protos/greeter.proto');

var server = new grpc.Server();

server.addService(greeterProto.greeter.GreeterService.service, {
  SayHello: function(call, callback) {
    console.log('request', call.request);
    
    callback(null, {
      message: 'howdy'
    });
  }

});

server.bind('0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');

server.start();