mbp:question_1 Daryl$ sh a.sh 
Already running mongo* processes (this is fyi, should be none probably):
51027 ttys002    0:00.00 grep mongo

make / reset dirs

running mongod processes...
about to fork child process, waiting until server is ready for connections.
forked process: 51034
child process started successfully, parent exiting
about to fork child process, waiting until server is ready for connections.
forked process: 51037
child process started successfully, parent exiting
about to fork child process, waiting until server is ready for connections.
forked process: 51040
child process started successfully, parent exiting

51034 ??         0:00.04 mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
51037 ??         0:00.04 mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
51040 ??         0:00.04 mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
51046 ttys002    0:00.00 grep mongo

Now run:

  mongo --shell --port 27003 a.js

mbp:question_1 Daryl$ mongo --shell --port 27003 a.js
MongoDB shell version: 2.6.1
connecting to: 127.0.0.1:27003/test
type "help" for help
{
	"ismaster" : false,
	"secondary" : false,
	"info" : "can't get local.system.replset config from self or any seed (EMPTYCONFIG)",
	"isreplicaset" : true,
	"maxBsonObjectSize" : 16777216,
	"maxMessageSizeBytes" : 48000000,
	"maxWriteBatchSize" : 1000,
	"localTime" : ISODate("2014-06-17T19:23:36.584Z"),
	"maxWireVersion" : 2,
	"minWireVersion" : 0,
	"ok" : 1
}

things to run for the homework:
  ourinit()            Used in problem #1, initiates the replica set for you
  testRollback()       Used in problems #1 and #2
  part4()              Used in problem #4

Server has startup warnings: 
2014-06-17T20:23:23.125+0100 [initandlisten] 
2014-06-17T20:23:23.126+0100 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
> ourinit();
{
	"info" : "Config now saved locally.  Should come online in about a minute.",
	"ok" : 1
}
waiting for set to initiate...
{
	"setName" : "z",
	"setVersion" : 1,
	"ismaster" : false,
	"secondary" : true,
	"hosts" : [
		"localhost:27003",
		"localhost:27002",
		"localhost:27001"
	],
	"me" : "localhost:27003",
	"maxBsonObjectSize" : 16777216,
	"maxMessageSizeBytes" : 48000000,
	"maxWriteBatchSize" : 1000,
	"localTime" : ISODate("2014-06-17T19:24:02.111Z"),
	"maxWireVersion" : 2,
	"minWireVersion" : 0,
	"ok" : 1
}
ok, this member is online now; that doesn't mean all members are 
ready yet though.
z:SECONDARY> testRollback
function testRollback() {         
    var im = db.isMaster();
    if( !im.ismaster ) {
        print("this member is not the primary.  run testRollback() on the 27003 and be sure it is primary.");
        printjson(db.isMaster());
        return;
    }
    if( !im.me.match(/03/) ) {
        throw "expected to be connected to the mongod on port 27003. try again/something wrong relative to the problem?";
    }
                                                                   
    // homework assumption: we are localhost:27003
    var a = connect("localhost:27001/admin");
    var b = connect("localhost:27002/admin");

    assert( db.isMaster().ismaster );
    if( !a.isMaster().secondary ) { 
        throw "27001 is not in secondary state. require/expect that.";
    }
    assert( b.isMaster().secondary );

    print("dropping test.foo collection...");
    db.foo.drop();
    db.getLastError(3); // await all to drop
    print("done");

    db.foo.insert({_id:1})
    db.foo.insert({_id:2})
    db.foo.insert({_id:3})

    print(3);
    printjson( db.getLastError('majority') );
    print(4);

    db.foo.insert({_id:4});
    print("stopping 27002...");
    b.shutdownServer();
    db.foo.insert({_id:5});
    db.foo.insert({_id:6});
    print("wait 2");
    db.getLastError(2);
    print("got wait 2");
    print("stopping 27001...");
    a.shutdownServer();
    sleep(100); // i don't think we need this...just to be sure as this is a simulation of failures...i 
                // believe shutdownServer waits for a response and then catches it
    db.foo.insert({_id:7});
    db.foo.insert({_id:8});
    db.foo.insert({_id:9});
    db.getLastError();
    print("done with testRollback. On problem #2 you need to stop (kill) the final mongod yourself.");
}
z:PRIMARY> 
z:PRIMARY> testRollback()
connecting to: localhost:27001/admin
connecting to: localhost:27002/admin
dropping test.foo collection...
done
3
null
4
stopping 27002...
2014-06-17T20:30:11.781+0100 DBClientCursor::init call() failed
server should be down...
wait 2
got wait 2
stopping 27001...
2014-06-17T20:30:11.788+0100 DBClientCursor::init call() failed
server should be down...
done with testRollback. On problem #2 you need to stop (kill) the final mongod yourself.
z:PRIMARY> 



mbp:question_1 Daryl$ ps -A | grep mongod
51040 ??         0:03.79 mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
51137 ttys001    0:00.00 grep mongod
mbp:question_1 Daryl$ mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
about to fork child process, waiting until server is ready for connections.
forked process: 51155
child process started successfully, parent exiting
mbp:question_1 Daryl$ mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
about to fork child process, waiting until server is ready for connections.
forked process: 51163
child process started successfully, parent exiting
mbp:question_1 Daryl$ 
mbp:question_1 Daryl$ ps -A | grep mongod
51040 ??         0:05.03 mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
51155 ??         0:00.34 mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
51163 ??         0:00.23 mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
51171 ttys001    0:00.00 grep mongod
mbp:question_1 Daryl$ 




> rs.status()
2014-06-17T20:33:33.146+0100 trying reconnect to 127.0.0.1:27003 (127.0.0.1) failed
2014-06-17T20:33:33.146+0100 reconnect 127.0.0.1:27003 (127.0.0.1) ok
{
    "set" : "z",
    "date" : ISODate("2014-06-17T19:33:33Z"),
    "myState" : 1,
    "members" : [
        {
            "_id" : 1,
            "name" : "localhost:27001",
            "health" : 1,
            "state" : 2,
            "stateStr" : "SECONDARY",
            "uptime" : 67,
            "optime" : Timestamp(1403033411, 9),
            "optimeDate" : ISODate("2014-06-17T19:30:11Z"),
            "lastHeartbeat" : ISODate("2014-06-17T19:33:32Z"),
            "lastHeartbeatRecv" : ISODate("2014-06-17T19:33:31Z"),
            "pingMs" : 0,
            "lastHeartbeatMessage" : "syncing to: localhost:27003",
            "syncingTo" : "localhost:27003"
        },
        {
            "_id" : 2,
            "name" : "localhost:27002",
            "health" : 1,
            "state" : 2,
            "stateStr" : "SECONDARY",
            "uptime" : 57,
            "optime" : Timestamp(1403033411, 9),
            "optimeDate" : ISODate("2014-06-17T19:30:11Z"),
            "lastHeartbeat" : ISODate("2014-06-17T19:33:32Z"),
            "lastHeartbeatRecv" : ISODate("2014-06-17T19:33:31Z"),
            "pingMs" : 0,
            "lastHeartbeatMessage" : "syncing to: localhost:27001",
            "syncingTo" : "localhost:27001"
        },
        {
            "_id" : 3,
            "name" : "localhost:27003",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
            "uptime" : 610,
            "optime" : Timestamp(1403033411, 9),
            "optimeDate" : ISODate("2014-06-17T19:30:11Z"),
            "electionTime" : Timestamp(1403033552, 1),
            "electionDate" : ISODate("2014-06-17T19:32:32Z"),
            "self" : true
        }
    ],
    "ok" : 1
}
> 
> db.foo.find()
{ "_id" : 1 }
{ "_id" : 2 }
{ "_id" : 3 }
{ "_id" : 4 }
{ "_id" : 5 }
{ "_id" : 6 }
{ "_id" : 7 }
{ "_id" : 8 }
{ "_id" : 9 }
> 




