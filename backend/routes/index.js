const router = require('express').Router();
let cards = require('../models/card.model');




router.route('/add').post( (req, res) => {
    console.log("HI you called ");
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags;

    
    const newCards = new cards({
       title,
       content,
       tags
    });

    newCards.save()
    .then(() => res.json('Card added!'))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/:id').get((req, res) => {
   
   const str = req.params.id;
   let arr = str.split(',');
   const results = arr.map(element => {
    return element.trim();
  });
   console.log(arr);
   cards.find({
        tags: {
            $all: results
          }
      })
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/cardview/:id').get((req, res) => {
   cards.findById(req.params.id)
     .then(cards => res.json(cards))
     .catch(err => res.status(400).json('Error: ' + err));
 });

router.route('/delete/:id').delete((req, res) => {
    cards.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    
    cards.findByIdAndUpdate(req.params.id,{
            title : req.body.title,
            content : req.body.content,
            tags : req.body.tags,
        },
            function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Updated User : ", docs);
                res.json('Card Updated')
            }
})
.catch(err => console.log("Error : " + err));

});




module.exports = router;


