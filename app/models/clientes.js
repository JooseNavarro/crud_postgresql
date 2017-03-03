Create a table Schema de la tabla
knex.schema.createTable('clientes', function(table) {
  table.increments('id');
  table.string('name', 50);
  table.string('contact_name', 50);
  table.string('phone_number', 50);
  table.string('address', 50);
})
// Finally, add a .catch handler for the promise chain
.catch(function(e) {
  console.error(e);
});
