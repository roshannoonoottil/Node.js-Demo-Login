const express = require('express')
const app = express()
const path = require('path')
const nocache=require('nocache')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}))
app.use(nocache())

//session working
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

  app.get('/signout', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

const phone =[
    {
      title:"OPPO F17",
      details:"This is a good Phone",
      img : "https://5.imimg.com/data5/SELLER/Default/2020/12/WI/VR/VK/118676901/oppo-f17-pro-mobile.jpg"
    },
    {
      title:"oneplus 12",
      details:"This is a good Phone",
      img : "https://img.etimg.com/photo/msid-101297745,imgsize-63600/OnePlus11R5G.jpg"
    },
    {
      title:"Vivo 7",
      details:"This is a good Phone",
      img : "https://tiimg.tistatic.com/fp/1/007/574/vivo-mobile-phone-7-38mm-ultra-smooth-body-170g-light-2-5d-adjusted-outline-for-a-great-hold-703.jpg"
    },
    {
      title:"Vivo 7",
      details:"This is a good Phone",
      img : "https://i.gadgets360cdn.com/products/large/redmi-note-12-5g-pro-plus-db-gadgets360-800x600-1673019783.jpg"
    }
  ]
  function checkSignIn(req,res,next){
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/');
    }
}




app.get('/',(req,res)=>
{
    if(req.session.isAuth){

        res.redirect('/home')
     }
     else{
         res.render('login')
     }
    // res.render('login')
});



credential={
    uname:"roshan",
    password:"qwerty"
}
var uName



app.post('/login',(req,res)=>{
    console.log("1");
    if(req.body.username==credential.uname&&req.body.password==credential.password)
    {
        console.log("2");
       uName=req.body.username;
       req.session.isAuth=true;
      //res.render('home',{uName,phone})
      res.redirect('/home')
      
  
    }
    else
    {
   
        console.log("3");
        const message = 'Invalid Username and Password';
        res.render('login', { message ,redirect:true});
      
  
    }
  });

  app.get('/home',checkSignIn,(req,res)=>{
    res.render('home',{phone,uName})
})



app.listen(4000,()=>{
    console.log("listening on server!!")
})

