mbp:final_exam Daryl$ mkdir temp_mart
mbp:final_exam Daryl$ mkdir temp_mart/cfg
mbp:final_exam Daryl$ mkdir temp_mart/s1
mbp:final_exam Daryl$ mkdir temp_mart/s2
mbp:final_exam Daryl$ cd temp_mart/
mbp:temp_mart Daryl$ mongorestore --dbpath cfg ../question_8/gene_backup/config_server/
mbp:temp_mart Daryl$ mongod --configsvr --dbpath cfg


mbp:final_exam Daryl$ mongo localhost:27019/config
MongoDB shell version: 2.6.1
connecting to: localhost:27019/config
Server has startup warnings: 
2014-06-19T07:58:43.717+0100 [initandlisten] 
2014-06-19T07:58:43.717+0100 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
configsvr> db
config
configsvr> db.chunks.find().sort({_id:1}).next().lastmodEpoch.getTimestamp().toUTCString().substr(20,6)
07:07 