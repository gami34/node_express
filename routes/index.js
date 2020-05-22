var express = require('express');
var router = express.Router();
var {HelpSchecma,AboutSchema,MoneySchema,InternationalSchema,SocialsSchema,PaymentDeliverySchema} = require('../models/footer')
var {check, validationResult} = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET dashboard template */
router.get('/dashboard/', function(req, res, next) {
  HelpSchecma.find({},(err,help)=>{
    if (err) {
      console.log(err)
    } else {
      AboutSchema.find({},(err,about)=>{
        if (err) {
          console.log(err)
        } else {
          MoneySchema.find({},(err, money)=>{
            if (err) {
              console.log(err)
            } else {
              InternationalSchema.find({},(err,international)=>{
                if (err) {
                  console.log(err)
                } else {
                  SocialsSchema.find({},(err,socials)=>{
                    if (err) {
                      console.log(err)
                    } else {
                      PaymentDeliverySchema.find({},(err, paymentndelivery)=>{
                        if (err) {
                          console.log(err)
                        } else {
                          return res.render('dashboard',{help,about,money,international,socials,paymentndelivery})
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});


// testing for dynamic route handling
router.post('/dashboard/:collection',[
  check('value','The The value field is empty').not().isEmpty(),
  check('url','The URL field is empty').not().isEmpty()
], function(req, res, next) {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
  } else {
    collection_name = 'help'==req.params.collection ? 'help': 'about'==req.params.collection ? 'about' : 'money'==req.params.collection ? 'money' : 'international'==req.params.collection ? 'international' : 'socials'==req.params.collection ? 'socials' : 'paymentndelivery'==req.params.collection ? 'paymentndelivery' : null ;
    
    collections = {
      help : new HelpSchecma(),
      about : new AboutSchema(),
      money : new MoneySchema(),
      international : new MoneySchema(),
      socials : new SocialsSchema(),
      paymentndelivery : new PaymentDeliverySchema()
    }
    // let helpSchecma = new HelpSchecma()
    console.log('working one')

    collections[collection_name].value = req.body.value;
    collections[collection_name].url = req.body.url;
    collections[collection_name].name = req.params.collection;

    console.log('working two')

    collections[collection_name].save((err)=>{
      if (err) {
        console.log(err)
      } else {
        res.redirect('/dashboard')
      }
    })
  }
});

// testing for dynamic route handling
router.get('/dashboard/:collection/:id', function(req, res, next) {
  
    collection_name = 'help'==req.params.collection ? 'help': 'about'==req.params.collection ? 'about' : 'money'==req.params.collection ? 'money' : 'international'==req.params.collection ? 'international' : 'socials'==req.params.collection ? 'socials' : 'paymentndelivery'==req.params.collection ? 'paymentndelivery' : null ;
    
    collections = {
      help : HelpSchecma,
      about : AboutSchema,
      money : MoneySchema,
      international : MoneySchema,
      socials : SocialsSchema,
      paymentndelivery : PaymentDeliverySchema
    }

    collections[collection_name].findById(req.params.id,(err,collection)=>{
      if (err) {
        console.log(err)
      } else {
        return res.render('read_dashboard',{title:'Edit Dashboard',collection})
      }
    })
});

// get a single update page for the elecment by ID
router.get('/dashboard/update/:collection/:id', function(req, res, next) {
  
  collection_name = 'help'==req.params.collection ? 'help': 'about'==req.params.collection ? 'about' : 'money'==req.params.collection ? 'money' : 'international'==req.params.collection ? 'international' : 'socials'==req.params.collection ? 'socials' : 'paymentndelivery'==req.params.collection ? 'paymentndelivery' : null ;
  
  collections = {
    help : HelpSchecma,
    about : AboutSchema,
    money : MoneySchema,
    international : InternationalSchema,
    socials : SocialsSchema,
    paymentndelivery : PaymentDeliverySchema
  }

  collections[collection_name].findById(req.params.id,(err,collection)=>{
    if (err) {
      console.log(err)
    } else {
      return res.render('update_dashboard',{title:'Edit Dashboard',collection})
    }
  })
});

// posting the data for updating a single element by ID
router.post('/dashboard/:collection/:id',[
  check('value','The The value field is empty').not().isEmpty(),
  check('url','The URL field is empty').not().isEmpty()
], function(req, res, next) {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
  } else {
    collection_name = 'help'==req.params.collection ? 'help': 'about'==req.params.collection ? 'about' : 'money'==req.params.collection ? 'money' : 'international'==req.params.collection ? 'international' : 'socials'==req.params.collection ? 'socials' : 'paymentndelivery'==req.params.collection ? 'paymentndelivery' : null ;
    
    let query ={_id:req.params.id}
    collections = {
      help : HelpSchecma,
      about : AboutSchema,
      money : MoneySchema,
      international : MoneySchema,
      socials : SocialsSchema,
      paymentndelivery : PaymentDeliverySchema
    }

    let data ={}
    console.log('working one')

    data.value = req.body.value;
    data.url = req.body.url;
    data.name = req.params.collection;

    console.log('working two')

    collections[collection_name].update(query,data,(err)=>{
      if (err) {
        console.log(err)
      } else {
        return res.redirect('/dashboard')
      }
    })
  }
});


// paymentndelivery
router.delete('/dashboard/delete/:collection/:id', function(req, res, next) {
  console.log('weorkinging')
  collection_name = 'help'==req.params.collection ? 'help': 'about'==req.params.collection ? 'about' : 'money'==req.params.collection ? 'money' : 'international'==req.params.collection ? 'international' : 'socials'==req.params.collection ? 'socials' : 'paymentndelivery'==req.params.collection ? 'paymentndelivery' : null ;
  
  let query = {_id:req.params.id}
  console.log(query)
  console.log('step_one')
  console.log(collection_name)

  collections = {
    help : HelpSchecma,
    about : AboutSchema,
    money : MoneySchema,
    international : InternationalSchema,
    socials : SocialsSchema,
    paymentndelivery : PaymentDeliverySchema
  }

  collections[collection_name].remove(query,(err)=>{
    if (err) {
      console.log(err)
    } else {
      return res.send('Success')
    }
  });
});








// router.post('/dashboard/help',[
//     check('value','The The value field is empty').not().isEmpty(),
//     check('url','The URL field is empty').not().isEmpty()
//   ], function(req, res, next) {
//     let errors = validationResult(req)

//     if (!errors.isEmpty()) {
//       return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
//     } else {
//       let helpSchecma = new HelpSchecma()

//       helpSchecma.value = req.body.value;
//       helpSchecma.url = req.body.url

//       helpSchecma.save((err)=>{
//         if (err) {
//           console.log(err)
//         } else {
//           res.redirect('/dashboard')
//         }
//       })
//     }
// });

// router.post('/dashboard/about',[
//   check('value','The The value field is empty').not().isEmpty(),
//   check('url','The URL field is empty').not().isEmpty()
// ], function(req, res, next) {
//   let errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
//   } else {
//     let aboutSchema = new AboutSchema()

//     aboutSchema.value = req.body.value;
//     aboutSchema.url = req.body.url

//     aboutSchema.save((err)=>{
//       if (err) {
//         console.log(err)
//       } else {
//         res.redirect('/dashboard')
//       }
//     })
//   }
// });

// router.post('/dashboard/money',[
//   check('value','The The value field is empty').not().isEmpty(),
//   check('url','The URL field is empty').not().isEmpty()
// ], function(req, res, next) {
//   let errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
//   } else {
//     let moneySchema = new MoneySchema()

//     moneySchema.value = req.body.value;
//     moneySchema.url = req.body.url

//     moneySchema.save((err)=>{
//       if (err) {
//         console.log(err)
//       } else {
//         res.redirect('/dashboard')
//       }
//     })
//   }
// });

// router.post('/dashboard/international',[
//   check('value','The The value field is empty').not().isEmpty(),
//   check('url','The URL field is empty').not().isEmpty()
// ], function(req, res, next) {
//   let errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     return res.status(422).render('dashboard',{title:'Dashboard', errors:errors.array()})
//   } else {
//     let internationalSchema = new InternationalSchema()

//     internationalSchema.value = req.body.value;
//     internationalSchema.url = req.body.url

//     internationalSchema.save((err)=>{
//       if (err) {
//         console.log(err)
//       } else {
//         res.redirect('/dashboard')
//       }
//     })
//   }
// });
module.exports = router;
