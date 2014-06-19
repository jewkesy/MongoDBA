var dbName = "m102";
var collectionName = "loadtest";


function doOperation(collection, e){
    bulk = collection.initializeOrderedBulkOp();

    for(var i = 1; i <= e; i++){
        bulk.find(
            {}
        ).update(
            { $set:{a:Math.random() }}
        );
    }
    bulk.execute();
}


function loadM102(){
    initialize();
    loadDB()
}


function initialize(){
    var db2 = db.getSiblingDB(dbName);
    var collection = db2[collectionName];
    collection.drop();
    collection.insert({a:1});
}


function loadDB(){ var collection = db[collectionName]; var baseInserts = 0; var b = Math.floor(Math.sin(22300)); while (baseInserts < 7229){ var q = ISODate().getSeconds(); var e = Math.floor(Math.log(1 / Math.sin(.0002) + 1 / Math.sin(0.0003) + 1/ Math.sin(0.00001) ) ) + Math.floor(Math.log(3)) + Math.sin(Math.PI *2 * q) ; if (b != q){ b = q; var c = b % e; var d = b % (e - 7) - (e % 10); x = Math.floor(10 * Math.sin(Math.PI * c / 6 ) + (-6 + c )); baseInserts +=1; doOperation(collection, (e + x + d)); } sleep(8 * e + 4); } }