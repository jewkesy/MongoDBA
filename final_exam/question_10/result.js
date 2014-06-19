mongos> db.elegans.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "snps.elegans"
	},
	{
		"v" : 1,
		"key" : {
			"snp" : 1
		},
		"name" : "snp_1",
		"ns" : "snps.elegans"
	}
]
mongos> db.elegans.findOne()
{
	"_id" : ObjectId("50c73c87f9cfd5a742299ef8"),
	"snp" : "bsP1",
	"N2" : "g",
	"mutant" : "t",
	"strain" : "CB4856"
}
mongos> db.elegans.ensureIndex({N2:1,mutant:1})
{
	"raw" : {
		"localhost:27501" : {
			"createdCollectionAutomatically" : false,
			"numIndexesBefore" : 2,
			"numIndexesAfter" : 3,
			"ok" : 1
		},
		"localhost:27601" : {
			"createdCollectionAutomatically" : false,
			"numIndexesBefore" : 2,
			"numIndexesAfter" : 3,
			"ok" : 1
		}
	},
	"ok" : 1
}
mongos> 
mongos> db.elegans.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "snps.elegans"
	},
	{
		"v" : 1,
		"key" : {
			"snp" : 1
		},
		"name" : "snp_1",
		"ns" : "snps.elegans"
	},
	{
		"v" : 1,
		"key" : {
			"N2" : 1,
			"mutant" : 1
		},
		"name" : "N2_1_mutant_1",
		"ns" : "snps.elegans"
	}
]
mongos> 
mongos> db.elegans.find({N2:"T",mutant:"A"}).limit(5)
{ "_id" : ObjectId("50c73c87f9cfd5a74229a0d0"), "snp" : "dbP4", "N2" : "T", "mutant" : "A", "strain" : "CB4856" }
{ "_id" : ObjectId("50c73c87f9cfd5a74229a0da"), "snp" : "haw6", "N2" : "T", "mutant" : "A", "strain" : "CB4856" }
{ "_id" : ObjectId("50c73c87f9cfd5a74229a0d6"), "snp" : "haw2", "N2" : "T", "mutant" : "A", "strain" : "CB4856" }
{ "_id" : ObjectId("50c73c87f9cfd5a74229a0db"), "snp" : "haw7", "N2" : "T", "mutant" : "A", "strain" : "CB4856" }
{ "_id" : ObjectId("50c73c87f9cfd5a74229a0d8"), "snp" : "haw4", "N2" : "T", "mutant" : "A", "strain" : "CB4856" }
mongos> db.elegans.find({N2:"T",mutant:"A"}).limit(5).explain()
{
	"clusteredType" : "ParallelSort",
	"shards" : {
		"localhost:27501" : [
			{
				"cursor" : "BtreeCursor N2_1_mutant_1",
				"isMultiKey" : false,
				"n" : 5,
				"nscannedObjects" : 5,
				"nscanned" : 6,
				"nscannedObjectsAllPlans" : 5,
				"nscannedAllPlans" : 6,
				"scanAndOrder" : false,
				"indexOnly" : false,
				"nYields" : 0,
				"nChunkSkips" : 0,
				"millis" : 0,
				"indexBounds" : {
					"N2" : [
						[
							"T",
							"T"
						]
					],
					"mutant" : [
						[
							"A",
							"A"
						]
					]
				},
				"server" : "mbp.local:27501",
				"filterSet" : false
			}
		],
		"localhost:27601" : [
			{
				"cursor" : "BtreeCursor N2_1_mutant_1",
				"isMultiKey" : false,
				"n" : 5,
				"nscannedObjects" : 5,
				"nscanned" : 6,
				"nscannedObjectsAllPlans" : 5,
				"nscannedAllPlans" : 6,
				"scanAndOrder" : false,
				"indexOnly" : false,
				"nYields" : 0,
				"nChunkSkips" : 0,
				"millis" : 0,
				"indexBounds" : {
					"N2" : [
						[
							"T",
							"T"
						]
					],
					"mutant" : [
						[
							"A",
							"A"
						]
					]
				},
				"server" : "mbp.local:27601",
				"filterSet" : false
			}
		]
	},
	"cursor" : "BtreeCursor N2_1_mutant_1",
	"n" : 10,
	"nChunkSkips" : 0,
	"nYields" : 0,
	"nscanned" : 12,
	"nscannedAllPlans" : 12,
	"nscannedObjects" : 10,
	"nscannedObjectsAllPlans" : 10,
	"millisShardTotal" : 0,
	"millisShardAvg" : 0,
	"numQueries" : 2,
	"numShards" : 2,
	"millis" : 0
}
mongos> 




Based on the explain output, which of the following statements below are true?

	No shards are queried.

	1 shard is queried.

X	2 shards are queried.

	5 documents are scanned.

	7 documents are scanned.

X	10 documents are scanned.

	Thousands of documents are scanned.
