const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authJwt, role } = require('../middlewares');

// Asegúrate de que todas las rutas usen controladores válidos
router.get('/',categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', [authJwt.verifyToken, role.checkRole('admin', 'coordinador')],categoryController.updateCategory);
router.post('/', [authJwt.verifyToken, role.checkRole('admin', 'coordinador')], categoryController.createCategory);
router.delete('/:id',[authJwt.verifyToken, role.checkRole('admin')],categoryController.deleteCategory);

module.exports = router;