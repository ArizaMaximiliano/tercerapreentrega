    -Separe el codigo en capas de la siguiente forma
        Router → Controller → Services → Repository → Dao → Base de datos
        Utilice DTO, Model, Factory para cart y products, indexRepository para ambos
    
    -La persistencia esta hecha en mongodb

    -En los endpoints no me funcionaba bien el middleware de auth, los endpoints responden diferente a usuario/admin pero creo que no estarian protegidos de esta forma
        en admin se permite agregar products y esta presentado el borrar products, pero no se pueden agregar products al carrito
        en usuario solo se permite agregar productos y generar el ticket
    -El carrito compra productos que tengan stock, si no tiene no se compran y quedan guardados en el carrito
    -Se genera un ticket con los objetos comprados y que posea stock 

    -Para podes usar el cartID tuve que crear un carrito cada vez que loguea el usuario, creo que no es correcto pero me sirvio para testear la pagina

    -En handlebars no puedo hacer metodos delete entonces presente el boton de eliminar productos simplemente

    Hay un endpoint /current donde muestra datos del usuario: rol, email, nombre 
        http://localhost:8080/api/current

        Informacion del usuario: { email: 'maxi@gmail.com', role: 'user' }

    
    tes de ticket:
        agregue productos y se muestran asi

        CartDTO {
        _id: new ObjectId('65cfbfb9b602ad138731ede1'),
        products: [
            {
            productId: new ObjectId('655e47965b7c02716a2ff281'),
            title: 'Producto de ejemplo4',
            price: 19.99,
            quantity: 2,
            _id: new ObjectId('65cfbfccb602ad138731ee2a')
            },
            {
            productId: new ObjectId('65ce2b6f9685ad595ece78cf'),
            title: 'test stock',
            price: 30,
            quantity: 3,
            _id: new ObjectId('65cfbfccb602ad138731ee2b')
            }
        ],
        totalPrice: 129.98
        }

        en este caso test stock solo posee 2 productos en stock
        este es el ticket generado

        {"message":"Compra realizada parcialmente","failedPurchases":["65ce2b6f9685ad595ece78cf"],"ticket":{"code":"65cfbfb9b602ad138731ede1","amount":19.99,"purchaser":"maxi@gmail.com","_id":"65cfbff3b602ad138731ee42","createdAt":"2024-02-16T20:05:07.516Z","updatedAt":"2024-02-16T20:05:07.516Z","__v":0}}

    
        
