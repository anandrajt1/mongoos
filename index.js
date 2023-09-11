const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.json())

const movieSchema = new mongoose.Schema({
    title: String,
    category:String,
    language:String,
    description:String,
    image:String
  });

  const Movie = mongoose.model('Movie', movieSchema);
  
// getting-started.js


main().then(()=>console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://anand:msmObeQm17eVqw57@cluster0.p4tezmm.mongodb.net/?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.post('/movies',async (req, res) => {
    const movieDetails=req.body
    const movie=new Movie(movieDetails)
    await movie.save()
    res.status(201).json(movie)
})

// to see all movies we added
app.get('/movies',async(req,res)=>{
 const moviesList= await Movie.find({});
 res.status(200).json(moviesList)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


