const Subcategory= require('../models/Subcategory');
const Category = require('../models/Category');

//Crear sub categoria
exports.createSubcategory = async(req, res)=>{
    try{
        const{name, description, category} = req.body;

        //Validar que la categoria exista
        const parentCategory = await Category.findById(category);
        if(!parentCategory){
            return res.status(404).json({
                success: false,
                message: 'La categoria no existe'
            });
        }

        const newSubcategory = new Subcategory({
            name: name.trim(),
            description: description.trim(),
            category
        });
        await newSubcategory.save();

        res.status(201).json({
            success: true,
            message:'Subcategoria creada existosa mente',
            data: newSubcategory
        });
    }catch(error){
        console.error('Error al crear la subcategoria:',error);


        if(error.message.includes('duplicate  key')|| error.message.includes('Ya existe')){
            return res.status(400).json({
                success: false,
                message: 'Ya existe una subcategoria con ese nombre'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Error al crear subcategoria'
        });
    }
    

};

//Obtener todas las subcategorias
exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category', 'name');
        res.status(200).json({
            success: true,
            data: subcategories
        });
    } catch (error) {
        console.error('Error al obtener subcategorias', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener subcategorias'
        });
    }
};

//Obtener subcategorias por id
exports.getSubcategoryById = async(req, res)=>{
    try{
        const subcategory = await Subcategory.findById(req.params.id)
            .populate('category','name');
        if(!subcategory){
            return res.status(404).json({
                success: false,
                message:'Subcategoria no encontrada'
            });
        }
        res.status(200).json({
            success:true,
            data: subcategory
        });
    }catch(error){
        console.error('Error al obtener la subcategoria:', error);
        res.status(500).json({
            success: false,
            message:'Error al obtener la subcategoria'
        });
    }
};
//Actualizar Subcategoria
exports.updateSubcategory = async(req, res)=>{
    try{
        const{name, description, category} = req.body;

        //Verificar si se cambia la categoria
        if(category){
            const parentCategory = await Category.findById(category);
            if(!parentCategory){
                return res.status(404).json({
                    success:false,
                    message:'La categoria no existe'
                });
            }
        }

        const updateCategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            {
                name: name? name.trim() : undefined,
                description: description? description.trim() : undefined,
                category
            },
            {new: true, runValidators: true}
        );

        if(!updateCategory){
            return res.status(404).json({
                success: false,
                message:'Subcategoria no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message:'Subcategoria actualisada',
            data: updateCategory
        });
    }catch(error){
        console.error('Error al actualizar la subcategoria', error);
        res.status(500).json({
            success: false,
            message:'Error al actualizar la subcategoria'
        });
    }
};

//Elimnar subcategoria
exports.deleteSubcategory = async(req,res)=>{
    try{
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!deletedSubcategory){
            return res.status(404).json({
                success:false,
                message:'Subcategoria no encontrada'
            });
        }
        res.status(200).json({
            success:true,
            message:'Subcategoria eliminada'
        });
    }catch(error){
        console.error('Error al eliminar subcategoria', error);
        res.status(500).json({
            success: false,
            message:'Error al eliminar subcategoria'
        });
    }
};