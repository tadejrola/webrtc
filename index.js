navigator.webkitGetUserMedia({ video: false, audio: true }, function (stream) {
    // var Peer = require("simple-peer");

    var peer = new SimplePeer({
        initiator: location.hash === "#init",
        trickle: false,
        stream: stream
    });

    peer.on("signal", function (data) {
        document.getElementById("yourid").value = JSON.stringify(data);
    })


    document.getElementById("connect").addEventListener("click", function () {
        var otherid = JSON.parse(document.getElementById("otherid").value);
        peer.signal(otherid);
    })

    document.getElementById("send").addEventListener("click", function () {
        var yourmessege = document.getElementById("yourmessege").value;
        peer.send(yourmessege);
    })

    peer.on("data", function (data) {
        document.getElementById("messeges").textContent += data + "\n";
    })

    peer.on("stream", function (stream) {
        var audio = document.createElement("audio");
        document.body.appendChild(audio);

        audio.src = window.URL.createObjectURL(stream);
        audio.play();
    })

}, function (err) {
    console.error(err);
})
