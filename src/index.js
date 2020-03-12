//var log = require("./modules/my-log")
var {info} = require("./modules/my-log");
var http = require("http");
var url = require('url');
var querystring = require('querystring');
var {countries} = require('countries-list');
   
var server = http.createServer(function(request, response) {  
    
    var parsed = url.parse(request.url);
    console.log(parsed);
    var pathname = parsed.pathname;
    var query = querystring.parse(parsed.query);

    if(pathname == '/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>HOME PAGE</p></body></html>');
    }else if(pathname == '/exit'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>BYE</p></body></html>');
    }else if(pathname == '/country'){
        var code = 'EC';
        if(query != null)
            code = query.code
        response.writeHead(200,{'Content-Type':'application/json'});
        response.write(JSON.stringify(countries[code]));
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.write('<html><body><p>Not found</p></body></html>');
        //log.error("path erroneo")
    }
    response.end();
});

server.listen(4000);
info("Running on 4000");

/* function suma(num1, num2) {
  return num1 + num2;
}

var result = suma(2, 4);

console.log("la suma es: ", result);
 */
