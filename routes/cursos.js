const express = require('express');
const cursosController = require('../controllers/cursos');
const config = require('../config/database');

const router = express.Router();

router.get('/home', cursosController.home);
router.post('/test', cursosController.test);
router.post('/save-curso', cursosController.saveCurso);
router.get('/curso/:id?', cursosController.getCurso);
router.get('/cursos', cursosController.getCursos)
router.put('/cursos/:id', cursosController.updateCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);

module.exports = router;