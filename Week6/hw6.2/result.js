$ mongo --shell localhost/week6 week6.js

mongos> sh.enableSharding("week6")
{ "ok" : 1 }
mongos>
mongos> db.trades.ensureIndex( { ticker:1, time:1 } )
{
	"raw" : {
		"mbp.local:27018" : {
			"createdCollectionAutomatically" : false,
			"numIndexesBefore" : 1,
			"numIndexesAfter" : 2,
			"ok" : 1
		}
	},
	"ok" : 1
}
mongos>
mongos> db.trades.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "week6.trades"
	},
	{
		"v" : 1,
		"key" : {
			"ticker" : 1,
			"time" : 1
		},
		"name" : "ticker_1_time_1",
		"ns" : "week6.trades"
	}
]
mongos>
mongos> sh.shardCollection("week6.trades", { ticker:1, time:1 })
{ "collectionsharded" : "week6.trades", "ok" : 1 }
mongos>
mongos> use config
switched to db config
mongos> db.chunks.find({}, {min:1,max:1,shard:1,_id:0,ns:1})
{ "ns" : "week6.trades", "min" : { "ticker" : { "$minKey" : 1 }, "time" : { "$minKey" : 1 } }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:04:04.005Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:04:04.005Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:08:08.012Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:08:08.012Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:12:12.019Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:12:12.019Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:16:16.026Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:16:16.026Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:20:20.033Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:20:20.033Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:24:24.040Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:24:24.040Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:28:28.047Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:28:28.047Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:32:32.054Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:32:32.054Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:36:36.061Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:36:36.061Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:40:40.068Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:40:40.068Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:44:44.079Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:44:44.079Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:48:48.092Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:48:48.092Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:52:52.107Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:52:52.107Z") }, "max" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:56:56.122Z") }, "shard" : "shard0000" }
{ "ns" : "week6.trades", "min" : { "ticker" : "abcd", "time" : ISODate("2012-03-03T09:56:56.122Z") }, "max" : { "ticker" : { "$maxKey" : 1 }, "time" : { "$maxKey" : 1 } }, "shard" : "shard0000" }
mongos> homework.b()
3