const express = require("express")
const route = express.Router()
const { mysql } = require("../helpers/mysql")
const moment = require("moment")

route.get('/', async (request, response) => {

    let pedidos_has_usuarios = await mysql.queryAsync(`SELECT p.* FROM pedidos_has_usuarios AS p`)
    
    return response.status(200).json({
        data: pedidos_has_usuarios
    })

})

route.post('/', async (request, response) => {

    const {pedido_id, usuario_id, admin} = request.body

    let registro = await mysql.queryAsync(`INSERT INTO pedidos_has_usuarios (pedido_id, usuario_id, admin, chegada) VALUES (?, ?, ?, ?)`, [pedido_id, usuario_id, admin, moment().format('YYYY-MM-DD HH:mm:ss')])
    
    return response.status(200).json({
        data: registro.insertId
    })

})

route.put('/:id', async (request, response) => {

    const {pedido_id, usuario_id, admin, chegada, saida} = request.body

    await mysql.queryAsync(`UPDATE pedidos_has_usuarios SET pedido_id = ?, usuario_id = ?, admin = ?, chegada = ?, saida = ? WHERE id = ?`, [pedido_id, usuario_id, admin, moment(chegada).format('YYYY-MM-DD HH:mm:ss'), moment(saida).format('YYYY-MM-DD HH:mm:ss'), request.params.id])
    
    return response.status(200).json({
        data: parseInt(request.params.id)
    })

})

route.post('/sair/:id', async (request, response) => {

    await mysql.queryAsync(`UPDATE pedidos_has_usuarios SET saida = ? WHERE id = ?`, [moment().format('YYYY-MM-DD HH:mm:ss'), request.params.id])
    
    return response.status(200).json({
        data: parseInt(request.params.id)
    })

})

module.exports = route