import express from 'express'
import usuarioRoutes from '../api/usuario/usuario.routes'
import produtoRoutes from '../api/produto/produto.routes'


const router = express.Router()


router.use('/usuario', usuarioRoutes)
router.use('/produto', produtoRoutes)


export default router
