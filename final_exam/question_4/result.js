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
	"localTime" : ISODate("2014-06-17T20:28:09.603Z"),
	"maxWireVersion" : 2,
	"minWireVersion" : 0,
	"ok" : 1
}

things to run for the homework:
  ourinit()            Used in problem #1, initiates the replica set for you
  testRollback()       Used in problems #1 and #2
  part4()              Used in problem #4

Server has startup warnings: 
2014-06-17T21:22:45.048+0100 [initandlisten] 
2014-06-17T21:22:45.048+0100 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
z:PRIMARY> cfg = rs.conf()
{
	"_id" : "z",
	"version" : 1,
	"members" : [
		{
			"_id" : 1,
			"host" : "localhost:27001"
		},
		{
			"_id" : 2,
			"host" : "localhost:27002"
		},
		{
			"_id" : 3,
			"host" : "localhost:27003"
		}
	]
}
z:PRIMARY> cfg.members[2].priority = 0
0
z:PRIMARY> rs.reconfig(cfg)
2014-06-17T21:28:36.439+0100 DBClientCursor::init call() failed
2014-06-17T21:28:36.441+0100 trying reconnect to 127.0.0.1:27001 (127.0.0.1) failed
2014-06-17T21:28:36.441+0100 reconnect 127.0.0.1:27001 (127.0.0.1) ok
reconnected to server after rs command (which is normal)

z:PRIMARY> rs.conf()
{
	"_id" : "z",
	"version" : 2,
	"members" : [
		{
			"_id" : 1,
			"host" : "localhost:27001"
		},
		{
			"_id" : 2,
			"host" : "localhost:27002"
		},
		{
			"_id" : 3,
			"host" : "localhost:27003",
			"priority" : 0
		}
	]
}
z:PRIMARY> 
z:PRIMARY> exit
bye
mbp:final_exam Daryl$ mongo --shell --port 27003 question_1/a.js 
MongoDB shell version: 2.6.1
connecting to: 127.0.0.1:27003/test
type "help" for help
{
	"setName" : "z",
	"setVersion" : 2,
	"ismaster" : false,
	"secondary" : true,
	"hosts" : [
		"localhost:27002",
		"localhost:27001"
	],
	"passives" : [
		"localhost:27003"
	],
	"primary" : "localhost:27001",
	"passive" : true,
	"me" : "localhost:27003",
	"maxBsonObjectSize" : 16777216,
	"maxMessageSizeBytes" : 48000000,
	"maxWriteBatchSize" : 1000,
	"localTime" : ISODate("2014-06-17T20:30:59.837Z"),
	"maxWireVersion" : 2,
	"minWireVersion" : 0,
	"ok" : 1
}

things to run for the homework:
  ourinit()            Used in problem #1, initiates the replica set for you
  testRollback()       Used in problems #1 and #2
  part4()              Used in problem #4

Server has startup warnings: 
2014-06-17T21:22:45.149+0100 [initandlisten] 
2014-06-17T21:22:45.149+0100 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
z:SECONDARY> part4()
233
z:SECONDARY>