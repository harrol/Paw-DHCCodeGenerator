require('mustache.js');
require('URI.js');

var DHCCodeGenerator = function () {

    var parsePath = function (uri) {
        var parsePort = function (uri) {
            return uri.port() ? ':' + uri.port() : '';
        };
        return uri.hostname() + parsePort(uri) + uri.path();
    };

    var mapParams = function (headers) {
        var result = [];
        for (var key in headers) {
            result.push({"name": key, "value": headers[key], "last": false});
        }
        if(result.length > 0) {
            var last = result.pop();
            last.last = true;
            result.push(last);
        }
        return result;
    };

    this.generate = function (context) {
        var request = context.getCurrentRequest();
        var uri = new URI(request.url);
        var headers = mapParams(request.headers);
        var queryparams = mapParams(uri.search(true));
        var view = {
            id: request.id,
            name: request.name,
            method: request.method,
            path: parsePath(uri),
            scheme: uri.protocol(),
            headers: headers,
            has_headers: headers.length > 0,
            queryparams: queryparams,
            has_queryparams: queryparams.length > 0
        };
        var template = readFile('dhc.mustache');
        return Mustache.render(template, view);
    };
};

DHCCodeGenerator.identifier = 'com.lissenberg.DHCCodeGenerator';
DHCCodeGenerator.title = 'DHC';
DHCCodeGenerator.fileExtension = 'json';
DHCCodeGenerator.languageHighlighter = 'javascript';

registerCodeGenerator(DHCCodeGenerator);


