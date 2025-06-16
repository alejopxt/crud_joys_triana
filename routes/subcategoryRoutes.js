const express =require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { check } = require('express-validator');
const { authJwt, role } = require('../middlewares');
//Validaciones
const validateSubcategory =[
    check('name').not().isEmpty().withMessage('El nombre esobligatorio'),
    check('description').not().isEmpty().withMessage('La descripcion es obligatoria'),
    check('category').not().isEmpty().withMessage('La categoria es obligatoria')
];

//Rutas
router.post('/', [authJwt.verifyToken, role.checkRole('admin', 'coordinador')], validateSubcategory,subcategoryController.createSubcategory);
router.get('/', subcategoryController.getSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.put('/:id', [authJwt.verifyToken, role.checkRole('admin', 'coordinador')],validateSubcategory, subcategoryController.updateSubcategory);
router.delete('/:id', [authJwt.verifyToken, role.checkRole('admin')], subcategoryController.deleteSubcategory);

module.exports = router;