import express from 'express'
import usuarioRoutes from '../api/usuario/usuario.routes'
import produtoRoutes from '../api/produto/produto.routes'
import vendaRoutes from '../api/venda/venda.routes'


const router = express.Router()


router.use('/usuario', usuarioRoutes)
router.use('/produto', produtoRoutes)
router.use('/venda', vendaRoutes)


export default router
