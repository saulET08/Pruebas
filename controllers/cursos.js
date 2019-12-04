const Cursos = require('../models/cursos');

const controller ={
    home: function(req,res){
        return res.status(200).send({
            message: 'Soy home'
        })
    },
    test: function(req,res){
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de cursos'
        });
    },
    //guardar documentos
    saveCurso: function(req,res){
        const cursos = new Cursos ();
        const params = req.body;

        cursos.titulo = params.titulo;
        cursos.descripcion = params.descripcion;
        cursos.dificultad = params.dificultad;
        cursos.fecha = params.fecha;

        cursos.save((err, cursosStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar el documento'});

            if(!cursosStored) return res.status(404).send({message:'No se ha podido guardar el documento'});

            return res.status(200).send({cursos: cursosStored});

        });
    },
    //obtener documento
    getCurso: function(req,res){
        const cursosId = req.params.id;

        if(cursosId == null) return res.status(404).send({message:'El curso no existe'});

        Cursos.findById(cursosId,(err, cursos)=>{
            if(err) return res.status(500).send({message:'Error al devolver los datos'});

            if(!cursos) return res.status(404).send({message:'El curso no existe'});

            return res.status(200).send({cursos});

        });
    },
    //obtener documentos
    getCursos: function(req,res){
        Cursos.find({}).exec((err, cursos)=>{
            if(err) return res.status(500).send({message:'Error al devolver los datos'});

            if(!cursos) return res.status(404).send({message:'El proyecto no existe'});

            return res.status(200).send({cursos});

        });
    },
    //actualizar documentos
    updateCurso: function(req,res){
        const cursosId = req.params.id;
        const update = req.body;
        Cursos.findByIdAndUpdate(cursosId,update, {new:true},(err, cursosUpdate)=>{
            if(err) return res.status(500).send({message:'Error al actualizar'});

            if(!cursosUpdate) return res.status(404).send({message:'No existe el curso para actualizar'});

            return res.status(200).send({
                cursos:cursosUpdate
            });

        });
    },
    //eliminar documentos
    deleteCurso: function(req,res){
        const cursosId = req.params.id;
        Cursos.findByIdAndRemove(cursosId,(err, cursosRemoved)=>{
            if(err) return res.status(500).send({message:'No se ha podido borrar el curso'});

            if(!cursosRemoved) return res.status(404).send({message:'No se puede eliminar ese curso'});

            return res.status(200).send({
                cursos:cursosRemoved
            });

        });
    }
}

module.exports = controller;