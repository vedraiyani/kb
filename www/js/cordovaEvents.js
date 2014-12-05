var cordovaEvents = {
    serviceurl: function() {
        return config.servicerooturl + "serviceInclude.php";//using config.js
    },
    isOnline: false,
    isLoggedIn: false,
    logintype: "",
    profilePicture: "",
    isFirstTimeLoad:true,
    init: function() {
        document.addEventListener('deviceready', cordovaEvents.onDeviceReady, false);
    },
    ///////////deviceready event listener
    onDeviceReady: function() {
        cordovaEvents.servicerooturl = config.servicerooturl;//using config.js
        document.addEventListener('backbutton', cordovaEvents.onBackButton, false);
        document.addEventListener("online", cordovaEvents.onOnline, false);
        document.addEventListener("offline", cordovaEvents.onOffline, false);
        cordovaEvents.checkConnection();
    },
    ///////////backbutton event listener
    onBackButton: function() {


    },
    ///////////online event listener
    onOnline: function() {
        //alert('online');
        //cordovaEvents.isOnline = true;
        cordovaEvents.serviceCheck(function(online) {
        });
    },
    ///////////offline event listener
    onOffline: function() {
        //alert('offline');
        cordovaEvents.isOnline = false;
    },
    checkConnection: function() {
        var networkState = navigator.connection.type;
        var status;
        switch (networkState) {

            case Connection.NONE:
                cordovaEvents.isOnline = false;
                status = 0;
                break;

            case Connection.UNKNOWN:
                //cordovaEvents.isOnline = true;
                status = 1;
                break;

            case Connection.ETHERNET:
                //cordovaEvents.isOnline = true;
                status = 2;
                break;

            case Connection.WIFI:
                //cordovaEvents.isOnline = true;
                status = 3;
                break;

            case Connection.CELL_2G:
                //cordovaEvents.isOnline = true;
                status = 4;
                break;

            case Connection.CELL_3G:
                //cordovaEvents.isOnline = true;
                status = 5;
                break;

            case Connection.CELL_4G:
                //cordovaEvents.isOnline = true;
                status = 6;
                break;
        }
        cordovaEvents.serviceCheck(function(online) {
        });
        return status;
    },
    /////////////////////database functions
    errorHandler: function(transaction, error) {
        alert('Error: ' + error.message + ' code: ' + error.code);

    },
    successCallBack: function() {
        //alert("DEBUGGING: success");
    },
    nullHandler: function() {
    },
    initDB: function() {
        if (!window.openDatabase) {
            alert('Databases are not supported in this browser.');
            return;
        }
        var shortName = 'WebSqlDB';
        var version = '1.0';
        var displayName = 'WebSqlDB';
        var maxSize = 200000;
        cordovaEvents.db = openDatabase(shortName, version, displayName, maxSize);
    },
    initTables: function() {
        var sql = "CREATE TABLE IF NOT EXISTS users(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        // sql += "userid INTEGER NOT NULL,";
        sql += "username varchar(50) NOT NULL,";
        sql += "email varchar(50) NOT NULL,";
        sql += "gender varchar(50) NOT NULL,";
        sql += "dob datetime NOT NULL,";
        sql += "accessToken varchar(215) NOT NULL,";
        sql += "logintype varchar(5) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS katha(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS kirtan(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS top15(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS download(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS playlist(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "songid INTEGER NOT NULL,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL,";
        sql += "playlistname varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS record(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL,";
        sql += "recordtime varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS queue(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL,";
        sql += "priority integer NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS album(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "genre varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

        sql = "CREATE TABLE IF NOT EXISTS bookmark(";
        sql += "id INTEGER NOT NULL PRIMARY KEY,";
        sql += "name varchar(50) NOT NULL,";
        sql += "file varchar(50) NOT NULL,";
        sql += "title varchar(50) NOT NULL,";
        sql += "album varchar(50) NOT NULL,";
        sql += "year INTEGER NOT NULL,";
        sql += "genre varchar(50) NOT NULL,";
        sql += "date datetime NOT NULL,";
        sql += "cover varchar(50) NOT NULL,";
        sql += "duration varchar(50) NOT NULL";
        sql += ");";
        cordovaEvents.query(sql, cordovaEvents.nullHandler);

    },
    showTables: function() {
        cordovaEvents.query("SELECT * FROM sqlite_master where type='table';", function(rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows.item(i);
                alert(row.name);
            }
        });
    },
    query: function(sql, callBackFunction) {
        cordovaEvents.initDB();
        cordovaEvents.db.transaction(function(transaction) {
            transaction.executeSql(sql, [],
                    function(transaction, result) {
                        ////remove&& result.rows != null
                        if (result != null && result.rows != null) {
                            callBackFunction(result.rows);
                        } else {
                            callBackFunction(true);
                        }
                    }, cordovaEvents.errorHandler);
        }, cordovaEvents.errorHandler, cordovaEvents.nullHandler);
    },
    updateTableData: function() {
        var status = cordovaEvents.checkConnection();
        //alert(status);
        if (cordovaEvents.isOnline) {
            ///update

            ///top15 table update
            $.ajax({
                url: cordovaEvents.serviceurl(),
                data: {
                    service: "searchSong",
                    searchby: "top15",
                    size: "15"
                },
                type: "POST",
                success: function(data1) {
                    //alert(data1);
                    var result = JSON.parse(data1);
                    var resultLength = result.length;
                    cordovaEvents.query('delete from top15', cordovaEvents.nullHandler);
                    for (var i = 0; i < result.length; i++)
                    {
                        cordovaEvents.query('insert into top15(id,name,file,title,album,year,genre,date,cover,duration)values(' + result[i].id + ',"' + result[i].name + '","' + result[i].file + '","' + result[i].title + '","' + result[i].album + '",' + result[i].year + ',"' + result[i].genre + '","' + result[i].date + '","' + result[i].cover + '",' + result[i].duration + ')', cordovaEvents.nullHandler);
                    }/*
                     cordovaEvents.query("SELECT * FROM top15;", function(rows) {
                     for (var i = 0; i < rows.length; i++) {
                     var row = rows.item(i);
                     alert(JSON.stringify(rows.item(i)));
                     }
                     });*/


                }
            }).fail(function() {
                //alert('error');

            });

////album update

            $.ajax({
                url: cordovaEvents.serviceurl(),
                data: {
                    service: "searchSong",
                    searchby: "field",
                    searchkey: "album,genre"
                            //condition: '["genre","=","kirtan"]'
                },
                type: "POST",
                success: function(data2) {
                    //alert(data2);
                    var result = JSON.parse(data2);
                    var resultLength = result.length;
                    cordovaEvents.query('delete from album', cordovaEvents.nullHandler);
                    for (var i = 0; i < result.length; i++)
                    {
                        cordovaEvents.query('insert into album(name,genre) values("' + result[i].album + '","' + result[i].genre + '");', cordovaEvents.nullHandler);
                    }/*
                     
                     cordovaEvents.query("SELECT * FROM album;", function(rows) {
                     for (var i = 0; i < rows.length; i++) {
                     var row = rows.item(i);
                     alert(JSON.stringify(rows.item(i)));
                     }
                     });*/



                }
            }).fail(function() {
                //alert('error');

            });


        } else {
            //alert('You are Not connected to internet..!');
        }

    },
    checkLogin: function(callBackFunction) {
        cordovaEvents.query("SELECT * FROM users;", function(rows) {
            if (rows.length == 1) {
                row = rows.item(0);

                if (row.logintype == "kb") {
                    ///
                    cordovaEvents.isLoggedIn = true;
                    cordovaEvents.logintype = "kb";
                    callBackFunction(cordovaEvents.isLoggedIn);

                } else {
                    /////

                    cordovaEvents.isLoggedIn = true;
                    cordovaEvents.logintype = "fb";
                    cordovaEvents.profilePicture = 'http://graph.facebook.com/' + row.id + '/picture?type=small';
                    callBackFunction(cordovaEvents.isLoggedIn);

                }

            } else {
                cordovaEvents.query('delete from users', cordovaEvents.nullHandler);
                cordovaEvents.isLoggedIn = false;
                callBackFunction(cordovaEvents.isLoggedIn);
            }
        });


    },
    serviceCheck: function(callBackFunction) {
        $.ajax({
            url: cordovaEvents.serviceurl(),
            data: {
                service: "serviceCheck"
            },
            type: "POST",
            success: function(data) {
                var result = JSON.parse(data);
                if (result.success) {
                    cordovaEvents.isOnline = true;
                    callBackFunction(true);
                } else {
                    cordovaEvents.isOnline = false;
                    callBackFunction(false);
                }
            }
        }).fail(function() {
            cordovaEvents.isOnline = false;
            callBackFunction(false);
        });
    }

};