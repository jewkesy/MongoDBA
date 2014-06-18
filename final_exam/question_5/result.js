Which of these statements is true? Note: to get a multiple answer question right in this final you must get all the components right, so even if some parts are simple, take your time.

X	We can create an index to make the query fast/faster: <pre>db.postings.find( { "comments.flagged" : true } )</pre>

X	One way to assure people vote at most once per posting is to use this form of update: <pre> db.postings.update( { _id:… }, { $inc : {votes:1}, $push : {voters:'joe'} } ); </pre> combined with an index on { voters : 1 } which has a unique key constraint.

	One way to assure people vote at most once per posting is to use this form of update: <pre> db.postings.update( { _id:… , voters:{$ne:'joe'} }, { $inc : {votes:1}, $push : {voters:'joe'} } ); </pre>