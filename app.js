var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    BodyParser = require('body-parser');

const config = require('./config/config');

/**
 * [knex Conecxion a la base de datos postgresql]
 * @type {[type]}
 */
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : config.db,
    user : config.user,
    password : config.password,
    database : config.nameDB
  }
});

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

/** @type {[Peticion]} [GET listar todo los clientes] */
app.get('/', (req,res)=>{
  knex('clientes').select('*').then(dataQuery=>{
    res.send(dataQuery);
  });
})

/** @type {[Peticion]} [POST insertar nuevo cliente] */
app.post('/cliente', (req,res)=>{
  knex('clientes').insert({
    name: req.body.nombre,
    contact_name: req.body.nombreContacto,
    phone_number: req.body.telefono,
    address:req.body.direccion

  }).then(function(data){
      res.send('Dato Guardado!')
  });
})

/** @type {[Peticion]} [PUT actualizar cliente] */
app.put('/clienteUpdate', (req,res)=>{

  knex('clientes').update({
    name: req.body.nombre,
    contact_name: req.body.nombreContacto,
    phone_number: req.body.telefono,
    address:req.body.direccion

  }).then(function(data){
      res.send('Dato Actualizado!')
  });
})

/** @type {[Peticion]} [DELETE eliminar cliente] */
app.delete('/cliente/:id', (req,res)=>{
  let cliente = req.params.id;
  console.log(cliente);
  knex('clientes')
  .where('id', cliente)
  .del().then(function(data){
      res.send('Cliente Eliminado!');
  });
})

/** Puerto De la app */
app.listen(config.Port, ()=>{
  console.log(`server run ${config.Port}`);
})
