Entrecomillados los campos a cambiar por el identificador buscado
Búsqueda general: http://localhost:8080/clientes o http://localhost:8080/facturas
+ por id: http://localhost:8080/clientes/"id"
+ por username: http://localhost:8080/clientes/usr/"username"
+ login:  http://localhost:8080/clientes/login/"username"/"password"
+ cambiar contraseña: http://localhost:8080/clientes/changepass/"contraseña vieja". Y en el cuerpo: 
{
    "username": "username",
    "password": "nueva password" 
}
+ cambiar perfil: http://localhost:8080/clientes/changeprofile/"username"/"contraseña vieja". Y en el cuerpo: 
{
    "nombre": "nuevo nombre",
    "direccion": "nueva direccion",
    "username": "nuevo username",
    "password": "nueva password"
}
+ búsqueda por nombre: http://localhost:8080/clientes/nombre/"nombre"
+ obtener facturas por cliente: http://localhost:8080/facturas/facturascliente/"username del cliente"
+ facturación total por cliente: http://localhost:8080/facturas/totalfacturacion/"username del cliente"
- Comprobación de la API con la clase PruebaApi, aségurate de cambiar los datos para su comprobación. 