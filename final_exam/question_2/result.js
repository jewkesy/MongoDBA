mbp:final_exam Daryl$ mongo --shell --port 27003 question_1/a.js 
MongoDB shell version: 2.6.1
connecting to: 127.0.0.1:27003/test
type "help" for help
{
	"setName" : "z",
	"setVersion" : 1,
	"ismaster" : true,
	"secondary" : false,
	"hosts" : [
		"localhost:27003",
		"localhost:27002",
		"localhost:27001"
	],
	"primary" : "localhost:27003",
	"me" : "localhost:27003",
	"maxBsonObjectSize" : 16777216,
	"maxMessageSizeBytes" : 48000000,
	"maxWriteBatchSize" : 1000,
	"localTime" : ISODate("2014-06-17T19:42:28.754Z"),
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
z:PRIMARY> 


mbp:question_2 Daryl$ ps -A | grep mongod
51040 ??         0:09.56 mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
51155 ??         0:04.80 mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
51163 ??         0:04.51 mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
51304 ttys001    0:00.00 grep mongod
mbp:question_2 Daryl$ 


z:PRIMARY> testRollback()
connecting to: localhost:27001/admin
connecting to: localhost:27002/admin
dropping test.foo collection...
done
3
null
4
stopping 27002...
2014-06-17T20:44:50.929+0100 DBClientCursor::init call() failed
server should be down...
wait 2
got wait 2
stopping 27001...
2014-06-17T20:44:50.935+0100 DBClientCursor::init call() failed
server should be down...
done with testRollback. On problem #2 you need to stop (kill) the final mongod yourself.
z:PRIMARY> 


mbp:question_2 Daryl$ ps -A | grep mongod
51040 ??         0:10.79 mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
51327 ttys001    0:00.00 grep mongod
mbp:question_2 Daryl$ 
mbp:question_2 Daryl$ killall mongod
mbp:question_2 Daryl$ ps -A | grep mongod
51358 ttys001    0:00.00 grep mongod
mbp:question_2 Daryl$ 
mbp:question_2 Daryl$ cd ../question_1/
mbp:question_1 Daryl$ mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
about to fork child process, waiting until server is ready for connections.
forked process: 51383
child process started successfully, parent exiting
mbp:question_1 Daryl$ mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
about to fork child process, waiting until server is ready for connections.
forked process: 51389
child process started successfully, parent exiting
mbp:question_1 Daryl$ 




mbp:final_exam Daryl$ mongo --shell --port 27001 question_1/a.js 
MongoDB shell version: 2.6.1
connecting to: 127.0.0.1:27001/test
type "help" for help
{
	"setName" : "z",
	"setVersion" : 1,
	"ismaster" : true,
	"secondary" : false,
	"hosts" : [
		"localhost:27001",
		"localhost:27003",
		"localhost:27002"
	],
	"primary" : "localhost:27001",
	"me" : "localhost:27001",
	"maxBsonObjectSize" : 16777216,
	"maxMessageSizeBytes" : 48000000,
	"maxWriteBatchSize" : 1000,
	"localTime" : ISODate("2014-06-17T19:51:24.201Z"),
	"maxWireVersion" : 2,
	"minWireVersion" : 0,
	"ok" : 1
}

things to run for the homework:
  ourinit()            Used in problem #1, initiates the replica set for you
  testRollback()       Used in problems #1 and #2
  part4()              Used in problem #4

Server has startup warnings: 
2014-06-17T20:49:37.397+0100 [initandlisten] 
2014-06-17T20:49:37.397+0100 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
z:PRIMARY> rs.status()
{
	"set" : "z",
	"date" : ISODate("2014-06-17T19:51:29Z"),
	"myState" : 1,
	"members" : [
		{
			"_id" : 1,
			"name" : "localhost:27001",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 112,
			"optime" : Timestamp(1403034290, 7),
			"optimeDate" : ISODate("2014-06-17T19:44:50Z"),
			"electionTime" : Timestamp(1403034596, 1),
			"electionDate" : ISODate("2014-06-17T19:49:56Z"),
			"self" : true
		},
		{
			"_id" : 2,
			"name" : "localhost:27002",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 98,
			"optime" : Timestamp(1403034290, 7),
			"optimeDate" : ISODate("2014-06-17T19:44:50Z"),
			"lastHeartbeat" : ISODate("2014-06-17T19:51:29Z"),
			"lastHeartbeatRecv" : ISODate("2014-06-17T19:51:28Z"),
			"pingMs" : 0,
			"lastHeartbeatMessage" : "syncing to: localhost:27001",
			"syncingTo" : "localhost:27001"
		},
		{
			"_id" : 3,
			"name" : "localhost:27003",
			"health" : 0,
			"state" : 8,
			"stateStr" : "(not reachable/healthy)",
			"uptime" : 0,
			"optime" : Timestamp(0, 0),
			"optimeDate" : ISODate("1970-01-01T00:00:00Z"),
			"lastHeartbeat" : ISODate("2014-06-17T19:51:28Z"),
			"lastHeartbeatRecv" : ISODate("1970-01-01T00:00:00Z"),
			"pingMs" : 0
		}
	],
	"ok" : 1
}
z:PRIMARY> 
z:PRIMARY> db.foo.find()
{ "_id" : 1 }
{ "_id" : 2 }
{ "_id" : 3 }
{ "_id" : 4 }
{ "_id" : 5 }
{ "_id" : 6 }
z:PRIMARY> db.foo.insert( { _id : "last" } )
WriteResult({ "nInserted" : 1 })
z:PRIMARY> 




mbp:question_1 Daryl$ mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z
about to fork child process, waiting until server is ready for connections.
forked process: 51430
child process started successfully, parent exiting
mbp:question_1 Daryl$ 


z:PRIMARY> rs.status()
{
	"set" : "z",
	"date" : ISODate("2014-06-17T19:54:19Z"),
	"myState" : 1,
	"members" : [
		{
			"_id" : 1,
			"name" : "localhost:27001",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 282,
			"optime" : Timestamp(1403034765, 1),
			"optimeDate" : ISODate("2014-06-17T19:52:45Z"),
			"electionTime" : Timestamp(1403034596, 1),
			"electionDate" : ISODate("2014-06-17T19:49:56Z"),
			"self" : true
		},
		{
			"_id" : 2,
			"name" : "localhost:27002",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 268,
			"optime" : Timestamp(1403034765, 1),
			"optimeDate" : ISODate("2014-06-17T19:52:45Z"),
			"lastHeartbeat" : ISODate("2014-06-17T19:54:17Z"),
			"lastHeartbeatRecv" : ISODate("2014-06-17T19:54:18Z"),
			"pingMs" : 0,
			"syncingTo" : "localhost:27001"
		},
		{
			"_id" : 3,
			"name" : "localhost:27003",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 56,
			"optime" : Timestamp(1403034765, 1),
			"optimeDate" : ISODate("2014-06-17T19:52:45Z"),
			"lastHeartbeat" : ISODate("2014-06-17T19:54:19Z"),
			"lastHeartbeatRecv" : ISODate("2014-06-17T19:54:19Z"),
			"pingMs" : 0,
			"syncingTo" : "localhost:27001"
		}
	],
	"ok" : 1
}
z:PRIMARY> db.foo.find()
{ "_id" : 1 }
{ "_id" : 2 }
{ "_id" : 3 }
{ "_id" : 4 }
{ "_id" : 5 }
{ "_id" : 6 }
{ "_id" : "last" }
z:PRIMARY> 
z:SECONDARY> rs.slaveOk()
z:SECONDARY> db.foo.find()
{ "_id" : 1 }
{ "_id" : 2 }
{ "_id" : 3 }
{ "_id" : 4 }
{ "_id" : 5 }
{ "_id" : 6 }
{ "_id" : "last" }
z:SECONDARY> 


Question: which one of the following is the true statement about mongodb's operation in these scenarios?


	The MongoDB primary does not write to its datafiles until a majority acknowledgement comes back from the rest of the cluster. When 27003 was primary, that was never received for writes 7,8,9.

	When 27003 came back up, it transmitted its write ops that the other members had not seen yet to those members so that they would have them also.

	Mongo preserves the order of writes in a collection in its consistency model. In this problem, 27003's oplog was effectively a "fork" and to preserves write ordering a rollback was necessary during 27003's recovery phase.

