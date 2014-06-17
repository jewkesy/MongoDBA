mbp:final_exam Daryl$ cd question_1/data/z3/rollback
mbp:rollback Daryl$ ls
test.foo.2014-06-17T19-53-29.0.bson
mbp:rollback Daryl$ bsondump --type=debug test.foo.2014-06-17T19-53-29.0.bson 
--- new object ---
	 size : 18
		 _id
			 type:  1 size: 13
--- new object ---
	 size : 18
		 _id
			 type:  1 size: 13
--- new object ---
	 size : 18
		 _id
			 type:  1 size: 13
3 objects found
mbp:rollback Daryl$ 




Final: Question 3

In question 2 the mongod on port 27003 does a rollback. Go to that mongod's data directory. Look for a rollback directory inside. Find the .bson file there. Run the bsondump utility on that file. What are its contents?

	There is no such file.

	It contains 2 documents.

X	It contains 3 documents.

	It contains 4 documents.

	It contains 8 documents.

	The file exists but is 0 bytes long.