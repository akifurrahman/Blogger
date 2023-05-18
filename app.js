const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');



// const {connectDB,getDB}=require('./db.js');

const app=express();

const dbURI='mongodb+srv://mohdakifurrahman:test1234@cluster0.vzpnzwy.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>{
    console.log("connected to db successfully");
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
//connecting DB
// let db;
// connectDB((err)=>{
//     if(!err){
//         app.listen(3000,()=>{
//         console.log("App listening at port 3000");
//         db=getDB();
//         })
//     }})


app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded());

// app.listen(3000);

app.use(morgan('dev'));

app.get('/home',(req,res)=>{
    // const blogs=[{'title':'First Article','article':'Esse irure quis ex aliqua est labore ad commodo culpa enim in Lorem. Lorem sit ad ex officia labore consectetur veniam labore. Ut ut reprehenderit voluptate occaecat quis velit sint est cillum aliquip. Ex quis ad irure enim Lorem. Irure dolore est in ex cillum mollit quis irure in occaecat magna. Velit quis anim dolor consequat.'},{'title':'Second Article','article':'Esse irure quis ex aliqua est labore ad commodo culpa enim in Lorem. Lorem sit ad ex officia labore consectetur veniam labore. Ut ut reprehenderit voluptate occaecat quis velit sint est cillum aliquip. Ex quis ad irure enim Lorem. Irure dolore est in ex cillum mollit quis irure in occaecat magna. Velit quis anim dolor consequat.'}];
    res.render('index',{name: 'Home Page',blogs})
});

// app.get('/house',(req,res)=>{
//     let books=[];

//     db.collection('books')
//         .find()
//         .sort({title:1})
//         .forEach(book=>{
//             books.push(book);
//         })
//         .then((result)=>{
//             res.status(200).json(books)
//             // res.render('house',{name: "Books",books:result})
//         })
//         .catch(()=>{
//             res.status(500).json({error:"Could not fetch Documents"})
//         })
// });

app.get('/getblog',(req,res)=>{
    const blog=new Blog({
        title:"article published on 13 may 23",
        article:"abcdefghijklmnop"
    });

    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
    })
})

app.get('/create-blog/',(req,res)=>{
    res.render('create-blog',{name:"Create a blog"})
})

// app.get('/allblogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{name:"All Blogs", blogs: result})
    })
    .catch(err=>{
        res.send("No blogs found");
        console.log(err);
    })
});


app.get('/about/',(req,res)=>{
    res.render('about',{name: 'About Page'})
}); 

app.get('/',(req,res)=>{
    res.redirect('/blogs/');
});

app.post('getblog',(req,res)=>{

});

app.use((req,res)=>{
    res.status(404).render('404',{name:'Not Found'});
});


