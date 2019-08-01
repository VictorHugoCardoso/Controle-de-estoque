import express from 'express'
import usuarioRoutes from '../api/usuario/usuario.routes'


const router = express.Router()


router.use('/usuario', usuarioRoutes)


export default router
