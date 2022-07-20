// import express from 'express';

// const app = express();
// const server = app.listen(8080, () => console.log('Listening on port 8080'));

// let sentence = "Hola mundo como estan";

// app.use(express.json())

// app.get('/api/frase', (req, res) =>{
//   res.send({sentence});
// });

// app.get('/api/letras/:num', (req, res)=> {
//   if(isNaN(req.params.num)) return res.status(400).send('El parámetro debe ser numérico');
//   if(parseInt(req.params.num)<1||parseInt(req.params.num)>sentence.length) return res.status(404).send('No hay nada aquí');
//   let num = parseInt(req.params.num);
//   res.send({letter:sentence.charAt(num-1)})
// });

// app.put('/api/palabras/:pos', (req, res)=> {
//   let newWord = req.body.word
//   if(isNaN(req.params.pos)) return res.status(400).send('El parámetro debe ser numérico');
//   if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>sentence.split(' ').length) return res.status(404).send('No hay nada aquí');
//   let newSentence = sentence.split(' ');
//   let oldWord = newSentence[parseInt(req.params.pos-1)];
//   newSentence[parseInt(req.params.pos-1)] = newWord
//   sentence = newSentence.join(' ');
//   res.send({previous: oldWord,
//   new: newWord})
// });

// app.post('/api/palabras', (req, res) =>{
//   let newWord = req.body.word;
//   sentence = sentence.concat(` ${newWord} `);
//   res.send({added:newWord})
// });

// app.post('/api/palabra', (req, res) =>{
//   let newWord = req.body
//   console.log(newWord)
//   res.send("Auxiliar")
// });

// app.delete('/api/palabras/:pos', (req, res) => {
//   if(isNaN(req.params.pos)) return res.status(400).send('El parámetro debe ser numérico');
//   if(parseInt(req.params.num)<1||parseInt(req.params.num)>sentence.length) return res.status(404).send('No hay nada aquí');
//   let newSentence = sentence.split(' ');
//   newSentence.splice(parseInt(req.params.pos-1), 1);
//   sentence = newSentence.join(' ');
//   res.send({spliced: 'word deleted'})
// });

// app.get('/users', (req,res) =>{
//   res.send({users})
// });

// let users = [
//   "Martin",
//   "Toto",
//   "Roda",
//   "Nico"
// ]

// app.get('/users/:userId', (req, res)=> {
//   console.log(req.params);
//   let id = req.params.userId
//   res.send(users[id-1]);
// });

