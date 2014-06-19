configsvr> db.shards.find()
{ "_id" : "s1", "host" : "s1/genome_svr1:27501,genome_svr2:27502,genome_svr2:27503" }
{ "_id" : "s2", "host" : "s2/genome_svr4:27601,genome_svr5:27602,genome_svr5:27603" }
configsvr> 
configsvr> 
configsvr> db.shards.save({ "_id" : "s1", "host" : "localhost:27501" })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
configsvr> db.shards.save({ "_id" : "s2", "host" : "localhost:27601" })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
configsvr> db.shards.find()
{ "_id" : "s1", "host" : "localhost:27501" }
{ "_id" : "s2", "host" : "localhost:27601" }
configsvr> 


mbp:temp_mart Daryl$ mongorestore --dbpath s1 ../question_8/gene_backup/s1/
mbp:temp_mart Daryl$ mongorestore --dbpath s2 ../question_8/gene_backup/s2/


mbp:temp_mart Daryl$ mongod --shardsvr --dbpath s1  --port 27501
mbp:temp_mart Daryl$ mongod --shardsvr --dbpath s2  --port 27601

mbp:final_exam Daryl$ mongos --configdb localhost:27019


mbp:final_exam Daryl$ mongo
MongoDB shell version: 2.6.1
connecting to: test
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
	"_id" : 1,
	"version" : 4,
	"minCompatibleVersion" : 4,
	"currentVersion" : 5,
	"clusterId" : ObjectId("539a07da42d3fc7c1e6e5412")
}
  shards:
	{  "_id" : "s1",  "host" : "localhost:27501" }
	{  "_id" : "s2",  "host" : "localhost:27601" }
  databases:
	{  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
	{  "_id" : "readings",  "partitioned" : true,  "primary" : "s1" }
	{  "_id" : "snps",  "partitioned" : true,  "primary" : "s1" }
		snps.elegans
			shard key: { "snp" : 1 }
			chunks:
				s2	1
				s1	1
			{ "snp" : { "$minKey" : 1 } } -->> { "snp" : "haw54524" } on : s2 Timestamp(2, 0) 
			{ "snp" : "haw54524" } -->> { "snp" : { "$maxKey" : 1 } } on : s1 Timestamp(2, 1) 
	{  "_id" : "test",  "partitioned" : false,  "primary" : "s1" }

mongos> 