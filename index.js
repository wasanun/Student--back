const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let students = [{id: 1, name: 'Winnie', weight: 99},
    {id: 2, name: 'Pooh', weight: 66}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/students')
    .get( (req, res) =>  res.json(students) )

    // insert a new student
    .post( (req, res)=> {
        var student = {};
        student.id =   students[students.length-1].id +1  ;
        student.name = req.body.name
        student.weight = req.body.weight
        students.push(student);
        res.json( {message: 'Student created!'} )
    })


router.route('/students/:student_id')
    .get ( (req,res) => {
        let id = students.findIndex( (student) => student.id === +req.params.student_id)
        res.json(students[id])
    })  // get a student

    .put ( (req,res) => {                               // Update a student
        // var id = req.params.student_id
        let id = students.findIndex( (student) => student.id === +req.params.student_id)
        students[id].name = req.body.name;
        students[id].weight = req.body.weight;
        res.json({ message: 'Student updated!' + req.params.student_id});
    })

    .delete ( (req,res) => {                   // Delete a student
        // delete    
        students = students.filter( (student) => student.id !== +req.params.student_id )
        res.json({ message: 'Student deleted: ' + req.params.student_id});
    })

app.listen(80, () => console.log('server ready'))