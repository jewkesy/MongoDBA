 mkdir -p /data/week6/shard1

 mongod --dbpath /data/week6/shard1/ --shardsvr  --port 27020

mongos> sh.addShard("mbp.local:27020")
{ "shardAdded" : "shard0001", "ok" : 1 }
mongos>
mongos> sh.addShard("mbp.local:27020")
{ "shardAdded" : "shard0001", "ok" : 1 }
mongos> homework.check1()
db.getSisterDB("config").shards.count() : 
2
There are 2 shards in the cluster
as expected
mongos> 
mongos> homework.c()
2014-06-11T13:46:42.601+0100 TypeError: Cannot read property 'length' of undefined at week6.js:67
mongos> 
mongos> db.getSisterDB("config").chunks.aggregate( [  { $match : { ns : "week6.trades" } } ,   { $group : { _id : "$shard" , n : { $sum : 1 } } } ] )
{ "_id" : "shard0000", "n" : 8 }
{ "_id" : "shard0001", "n" : 7 }

2