const express = require('express')
const morgan = require('morgan')
const appList = require('./appList')

const app = express()

app.use(morgan('common'))

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query
  
    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must equal Rating or App')
      }
    }

    if (genres){
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            return res
            .status(400)
            .send('Genres must equal Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }
  
    let results = appList

    
    if(sort==='App'){
        results.sort((a,b)=>{
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }
    if(sort==='Rating'){
        results.sort((a,b)=>{
            return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
        })
    }

    if(genres){
       results = results.filter(app => app.Genres.includes(genres))
    }
       
    res
      .json(results);
  });

  app.listen(8080, () => {
    console.log('Server started on PORT 8080');
  });