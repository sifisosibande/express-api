import  express from 'express';

const app = express();
/* app.get('/', function(req,res){
    res.send('Hello From My API!!')
})
app.get('/api/greet', function (req,res){
    console.log(req.query);
    const username = req.query.username;
    res.json({
        message: `Hello!, ${username}`
    })
    

}) */
app.use(express.json())

app.use(express.static('public'));

const greetings ={
    'english':'Hello',
    'zulu':'sawubona'
}
app.get('/api/greet', function(req,res){
    const username = req.query.username;
    const language = req.query.language;

    if (!greetings[language]) {
        return res.json({
            error: 'Invalied language supplied'
        })
    }
    const greeting = greetings[language];

    res.json({
        message: `${greeting},${username}`
    })
});
app.post('/api/greet', function(req,res){

    const language = req.body.language;
    greetings[language] = req.body.greeting

    res.json({
        status: 'success',
        message: `Adding a greeting for ${language}`
    });
});    



/* app.get('/api/greet/:username', function (req,res){
    console.log(req.params);
    const username = req.params.username;
    res.json({
        message: `Hello!, ${username}`
    })
}) */

const PORT = process.env.PORT || 4009;
app.listen(PORT,function(){
    console.log(`app starter`)
})
