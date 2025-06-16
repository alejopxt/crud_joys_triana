const checkRole = (...allowedRoles) =>{
    return (req, res, next )=>{
        if(!req.userRole){
            console.error('intento de verificar rol son token valido');
            return res.status(500).json({
                success: false,
                message: 'Error al verificar rol'
            });
        }
        if (!allowedRoles.includes(req.userRole)){
            console.log(`Acceso denegado para ${req.userEmail} (${req.userRole}) en ruta ${req.originalUrl}`);
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado'
            });
        }
        next();
    };
};

//Funciones especificas de rol
const isAdmin = (req, res, next)=>{
    return checkRole('admin')(req, res, next);
};

const isCoordinador = (req, res, next)=>{
    return checkRole('coordinador')(req, res, next);
};

const isAuxiliar = (req, res, next)=>{
    return checkRole('auxiliar')(req, res, next);
};

module.exports = {
    checkRole,
    isAdmin,
    isCoordinador,
    isAuxiliar
};