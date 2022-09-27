document.getElementById("buttonClose").addEventListener('click',function(){
    navigator.app.exitApp();
});

function redirectTo(location) {
    window.open = cordova.InAppBrowser.open;
    //showPleasewait('Redirecting','Please wait');
    var d = setInterval(function () {
        window.open(location, '_self','location=no,zoom=no,toolbar=no');
        //window.open.addEventListener('message',getUrlBrow());
        clearInterval(d);
    }, 1850);
}

function getUrlBrow(){
    navigator.notification.alert('hola');
}

function downLoad(e){
    navigator.notification.alert(e.url);
}

function getURLParams( name, url ) {
    try {
        if (!url)
            url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    } catch (e) {
        showSMS(e);
        return null;
    }
}

function downloadFileFromServer(fileServerURL){
    try {
        var Downloader = window.plugins.Downloader;
        var fileName = fileServerURL.substring(fileServerURL.lastIndexOf("/") + 1);
    
        var downloadSuccessCallback = function(result) {
              console.log(result.path); 
    
        };
    
        var downloadErrorCallback = function(error) {
            // error: string
            console.log(error);
        };
    
        //TODO cordova.file.documentsDirectory for iOS
    
        var options = {
            title: 'Descarga de '+ fileName, // Download Notification Title
            url: fileServerURL, // File Url
            path: fileName, // The File Name with extension
            description: 'La descarga del archivo esta lista', // Download description Notification String
            visible: true, // This download is visible and shows in the notifications while in progress and after completion.
            folder: "Download" // Folder to save the downloaded file, if not exist it will be created
        };
    
        Downloader.download(options, downloadSuccessCallback, downloadErrorCallback);
    } catch (e) {
        console.log(e);
    }
}
function downloadReceipt(args) {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(args.url);
  
    fileTransfer.download(
      uri, // file's uri
      args.targetPath, // where will be saved
      function(entry) {
        console.log("download complete: " + entry.toURL());
        window.open(entry.toURL(), '_blank', 'location=no,closebuttoncaption=Cerrar,toolbar=yes,enableViewportScale=yes');
      },
      function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
      },
      true,
      args.options
    );
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
            navigator.notification.alert('Una conexión a internet es necesaria para continuar');
        } else {
            redirectTo("https://smartbookeepingapp.herokuapp.com/views/index.html");
        }
    }
};
app.initialize();