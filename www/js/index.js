document.getElementById("buttonClose").addEventListener('click',function(){
    navigator.app.exitApp();
});

function redirectTo(location) {
    window.open = cordova.InAppBrowser.open;
    //showPleasewait('Redirecting','Please wait');
    var d = setInterval(function () {
        window.open(location, '_self','location=no,zoom=no,toolbar=no');
        window.open.addEventListener('loadStart',downLoad(e));
        clearInterval(d);
    }, 1850);
}

function downLoad(e){
    var url = e.url;
    var extension = url.substr(url.lenght - 4);
    if(extension == '.pdf'){
        var targetPath = cordova.file.documentsDirectory + "recipt.pdf";
        var options = {};
        var args = {
            url : url,
            targetPath: targetPath,
            options: options
        };
        
    }
}

var app = {
    // Application Constructor
    initialize: function () {
    document.addEventListener('deviceready',
        this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        if (navigator.connection.type == Connection.NONE){
            navigator.notification.alert('An internet connection is required to continue');
        } else {
            redirectTo("http://192.168.1.7/despEsquivel-Mobile/index.html");
        }
    }
};
app.initialize();