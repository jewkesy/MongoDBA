mkdir -p /data/week6/shard0

mongod --dbpath /data/week6/shard0/ --shardsvr 


mongos --configdb mbp.local:27019


$ mongo --shell localhost/week6 week6.js                        prints a general overview of the cluster
mongos> sh.addShard("mbp.local:27018")
{ "shardAdded" : "shard0000", "ok" : 1 }

mongos> db.trades.stats()
{
	"sharded" : false,
	"primary" : "shard0000",
	"ns" : "week6.trades",
	"count" : 1000001,
	"size" : 496000240,
	"avgObjSize" : 495,
	"storageSize" : 629637120,
	"numExtents" : 16,
	"nindexes" : 1,
	"lastExtentSize" : 168742912,
	"paddingFactor" : 1,
	"systemFlags" : 1,
	"userFlags" : 1,
	"totalIndexSize" : 32458720,
	"indexSizes" : {
		"_id_" : 32458720
	},
	"ok" : 1
}
mongos> homework.a()
1000001