var bodyParser = require("body-parser"),
    express    = require('express'),
    app        =   express(),
    mongoose   = require('mongoose');


mongoose.connect("mongodb://localhost:27017/rest_app", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


var blogSchema = new mongoose.Schema({
	title: String,
	views: Number
});

var Blog = mongoose.model("Blog", blogSchema);


var user_id = '6011a2999d4ea22ff8ae9310';

// Blog.create({
//    title: "Test",
//    views: 2
// });

// db.blogs.insert(Blog);


// Blog.update(
//    {title: "Test"},
//    { $inc: {views: 1}}
// );

// db.blogs.update(
//    {title: "Test"},
//    { $inc: {views: 1} }
// )
	
mongoose.set("useFindAndModify", false);
Blog.findByIdAndUpdate(user_id,{$inc: {views: 1}}, {new:true})
    .then((data)=>{console.log(data.views)})
    .catch((err)=>{console.log(err)});



app.get("/", function(req, res){
  res.render("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR");
		} else{
			res.render("index_View", {blogs: blogs});
		}
	});
});

app.listen(3014, function(){
console.log("Server has started");
});





// nodemon app.js