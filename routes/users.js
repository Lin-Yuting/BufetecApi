const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Importar modelos
const User = require('../model/User');
const Biblioteca = require('../model/Biblioteca');
const Catalogo_Clientes = require('../model/Catalogo_Clientes');
const Citas = require('../model/Citas');
const Abogados = require('../model/Abogados');
const ProcesosLeg = require('../model/ProcesosLeg');
const RecursosEducativos = require('../model/RecursosEducativos');

// Endpoints existentes
router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users).status(200);
});

router.get("/biblioteca", async (req, res) => {
    const biblio = await Biblioteca.findAll();
    res.json(biblio).status(200);
});

router.post("/register", async (req, res) => {

    try{
        const newUser = req.body;
        const user = await User.findOne({ where: {user_email: newUser.user_email } });


            const token = jwt.sign(
                { id_user: newUser.id_user, user_email: newUser.user_email, user_role: newUser.user_type },
                process.env.SECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({ message: "User created successfully", token: token });

    }
    catch(e){
        return res.status(500).json({message: e.message})
    }

});

router.post("/login", async (req, res) => {
    try{
        const loginUser = req.body;
        const user = await User.findOne({ where: { user_email: loginUser.user_email } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        } else {

            const token = jwt.sign(
                    { id_user: user.id_user, user_email: user.user_email, user_role: user.user_role },
                    process.env.SECRET,
                    { expiresIn: "1h" }
                );
            //coment

            res.status(200).json({ message: "User logged in", token: token });
        //     const valid = await bcrypt.compare(loginUser.password, user.password);

        //     if (valid) {

        //     } else {
        //         return res.status(401).json({ message: "Invalid credentials" });
        //     }
    }
    }
    catch(e){
        return res.status(500).json({ message: e.message });
    }
});


// Eliminar cuenta de usuario 

router.delete("/delete/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Busca al usuario por correo electrónico
    const user = await User.findOne({ where: { user_email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Borra el usuario
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

// Nuevos Endpoints para las tablas adicionales

// Endpoint para Catalogo de Clientes
router.get("/clientes", async (req, res) => {
    const clientes = await Catalogo_Clientes.findAll();
    res.json(clientes).status(200);
});

router.post("/clientes", async (req, res) => {
    const newCliente = req.body;
    await Catalogo_Clientes.create(newCliente);
    res.status(201).json({ message: "Cliente created successfully" });
});

// Endpoint para Citas
router.get("/citas", async (req, res) => {
    const citas = await Citas.findAll();
    res.json(citas).status(200);
});

router.post("/citas", async (req, res) => {
    const newCita = req.body;
    await Citas.create(newCita);
    res.status(201).json({ message: "Cita created successfully" });
});

// Endpoint para Abogados
router.get("/abogados", async (req, res) => {
    const abogados = await Abogados.findAll();
    res.json(abogados).status(200);
});

router.post("/abogados", async (req, res) => {
    const newAbogado = req.body;
    await Abogados.create(newAbogado);
    res.status(201).json({ message: "Abogado created successfully" });
});

// Endpoint para Procesos Legales
router.get("/procesos", async (req, res) => {
    const procesos = await ProcesosLeg.findAll();
    res.json(procesos).status(200);
});

router.post("/procesos", async (req, res) => {
    const newProceso = req.body;
    await ProcesosLeg.create(newProceso);
    res.status(201).json({ message: "Proceso created successfully" });
});

// Endpoint para Recursos Educativos
router.get("/recursos", async (req, res) => {
    const recursos = await RecursosEducativos.findAll();
    res.json(recursos).status(200);
});

router.post("/recursos", async (req, res) => {
    const newRecurso = req.body;
    await RecursosEducativos.create(newRecurso);
    res.status(201).json({ message: "Recurso created successfully" });
});

module.exports = router;

