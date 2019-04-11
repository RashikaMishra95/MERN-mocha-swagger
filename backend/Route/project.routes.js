const {Router} = require('express');
const router = Router();
const Project = require('../Models/Project');

router.get('/list',(req,res,next)=>{
    Project.find((err,proj)=>{
        if(err){
            console.log("err", err);
        }
        else{
            res.json(proj);
        }
    });
});

router.get('/:id',(req, res,next)=> {
    let id = req.params.id;
    Project.findById(id, (err, proj)=>{
        res.json(proj);
    });
});

router.post('/add',(req,res,next)=>{
    console.log("in add route");

    let proj = new Project(req.body);
    proj.save()
        .then(data=>{
            console.log("data", data);
            res.status(200).json({'proj':'Added Successfully','data': data})
        })
        .catch(err => {
            console.log("err", err);
            res.status(400).send('adding new todo failed');
        });
});

router.put('/update/:id',(req,res,next)=>{
   Project.findById(req.params.id,(err,data)=>{
       if(!data){
           res.status(404).send("data is not found");
       }
       else{
           data.taskName = req.body.taskName;
           data.description = req.body.description;
           data.priority = req.body.priority;
           data.completed = req.body.completed;
           data.save()
               .then(proj => {
                   res.json({'proj':'Project updated!', 'data':proj});
               })
               .catch(err => {
                   res.status(400).send("Update not possible");
               })

       }
   })
});

router.delete('/delete/:id',(req, res,next)=> {
    let id = req.params.id;
    Project.remove(id, (err, result)=>{
        res.json({ message: "Project successfully deleted!", result });
    });
});


module.exports = router;