var Peer = require('simple-peer')

var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    var p = new Peer({
        initiator:location.hash === "#init",
        trickle:false,
        stream:mediaStream
    });

    p.on('signal', function (data) {
        document.querySelector('#yourId').textContent = JSON.stringify(data)
    });

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value);
        p.signal(otherId)
    });

    document.getElementById('send').addEventListener('click', function () {
        var msg = document.getElementById('yourMessage').value;
        p.send(msg);
    });

    p.on('data', function (data) {
        console.log(data);
        document.getElementById('messages').innerHTML = data + '\n';
    })
    p.on('stream', function (stream) {
        var vdo = document.createElement('video');
        document.body.appendChild(vdo);
        vdo.srcObject = mediaStream;
        vdo.onloadedmetadata = function(e) {
            vdo.play();
        };
    })
});

