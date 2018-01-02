var http = require('https');
var express = require('express')
var request = require('request');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var qs = require('querystring');
var fs = require("fs");
app.use(cors());


app.use(bodyParser.json())

app.post('/CobrandLogin', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});

app.post('/RegisterUser', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'RegisterUser Failed' });
            }
        }

    });

});

app.post('/LoginUser', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'LoginUser Failed' });
            }
        }

    });

});

app.post('/getToken', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'getToken Failed' });
            }
        }

    });

});

app.post('/YSLCobrandLogin', function(req, res) {

    console.log(req.body);

    var url = req.body.url;
   
    var parameters =
    {
        "cobrand":{
            "cobrandLogin": req.body.cobrandLogin,
            "cobrandPassword": req.body.cobrandPassword,
        }
    }

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/json' },
        url: url,
        body:JSON.stringify(parameters)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});

app.post('/YSLUserRegister', function(req, res) {

    console.log(req.body);

    var url = req.body.url;
   
    var parameters =
    {
        "user": {
            "loginName": req.body.loginName, 
            "password": req.body.password, 
            "email": req.body.email, 
            "name": {
                "first": req.body.fname,
                "last": req.body.lname 
            }
        }
    };

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/json','Authorization':'cobSession='+ req.body.cobSessionToken},
        url: url,
        body:JSON.stringify(parameters)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});

app.post('/YSLUserlogin', function(req, res) {

    console.log(req.body);

    var url = req.body.url;
   
    var parameters =
    {
        "user": {
            "loginName": req.body.loginName, 
            "password": req.body.password, 
        }
    };

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/json','Authorization':'cobSession='+ req.body.cobSessionToken},
        url: url,
        body:JSON.stringify(parameters)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});


app.post('/YSLGetToken', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.get({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/json','Authorization':'cobSession=' + req.body.cobSessionToken + ',userSession=' + req.body.userSessionToken},
        url: url+'?appIds='+req.body.finAppId,
        body:JSON.stringify(req.body.finAppId)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});

app.post('/addTransferAccount', function(req, res) {

    // console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'addTransferAccount Failed' });
            }
        }

    });

});
app.post('/get_Account_Success_Data', function(req, res) {

    // console.log(req.body);

    var url = req.body.url;

    request.post({
        "rejectUnauthorized": false,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'get_Account_Success_Data Failed' });
            }
        }

    });

});

app.post('/syncApi/CobrandLogin', function(req, res) {

    console.log(req.body);

    var url = req.body.url;

    request.post({
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: JSON.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'Cobrand Login Failed' });
            }
        }

    });
});

app.post('/syncApi/dataExtractsEvents', function(req, res) {

    // console.log(req.body);

    var url = req.body.url;
    console.log(url + req.body.eventName + '&fromDate=' + req.body.fromDate + '&toDate=' + req.body.toDate);
    request.get({
        headers: { 'Authorization': req.body.cobSession },
        url: url + req.body.eventName + '&fromDate=' + req.body.fromDate + '&toDate=' + req.body.toDate,
        body: JSON.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'dataExtractsEvents Failed' });
            }
        }
    });
});

app.post('/syncApi/getParticularUserData', function(req, res) {

    // console.log(req.body);

    var url = req.body.url;
    request.get({
        headers: { 'Authorization': req.body.cobSession },
        url: url,
        body: JSON.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            res.send({ 'error': error });
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (err) {
                res.send({ 'error': 'getParticularUserData Failed' });
            }
        }
    });
});

app.post('/SSOLogin', function(req, res) {

    var url = req.body.url;

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: qs.stringify(req.body)
    }, function(error, response, body) {
        if (error) {
            res.send({ 'error': error });
        } else {
            try {
                // console.log(body);
                res.send(body);
            } catch (err) {
                res.send({ 'error': 'SSOLogin Failed' });
            }
        }
    });
});


var server = app.listen(3006, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})