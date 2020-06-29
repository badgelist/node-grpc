var protobuf = require("protobufjs");
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync('protos/greeter.proto');
var protoDefinition = grpc.loadPackageDefinition(packageDefinition).greeter;

var client = new protoDefinition.GreeterService('localhost:50051', grpc.credentials.createInsecure());

var HelloRequest;
protobuf.load("protos/greeter.proto", function(err, root) {
  if (err) throw err;

  // Obtain a message type
  HelloRequest = root.lookupType('greeter.HelloRequest');
});


var testObject = {
  a: 1,
  b: 'two',
  c: {
    d: false
  }
};

client.SayHello(
  HelloRequest.create(testObject),
  ((response) => { console.log('response', response); })
);

function main() {
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });
}

main();