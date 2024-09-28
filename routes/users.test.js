const request = require("supertest");
const app = require("../app"); // Asegúrate de importar tu aplicación Express

describe("API User Endpoints", () => {
  let userToken = "";
  let userId = "";

  // Test para registrar un usuario
  it("Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/register").send({
      user_firstname: "Valeria",
      user_lastname: "Perez",
      user_email: "valeria@example.com",
      password: "password123",
      user_username: "valeria_p",
      user_type: "usuario",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });

  // Test para login
  it("Debe hacer login correctamente con credenciales válidas", async () => {
    const res = await request(app).post("/login").send({
      email: "valeria@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User logged in");
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });

  // Test para obtener todos los usuarios
  it("Debe obtener una lista de usuarios", async () => {
    const res = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test para eliminar un usuario
  it("Debe eliminar un usuario", async () => {
    const res = await request(app)
      .delete(`/delete/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");
  });
});

describe("API Catalogo Endpoints", () => {
  // Test para obtener la lista de clientes
  it("Debe obtener una lista de clientes", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test para crear un nuevo cliente
  it("Debe crear un nuevo cliente", async () => {
    const res = await request(app).post("/clientes").send({
      nombre: "Juan Perez",
      direccion: "Av. Siempre Viva",
      telefono: "1234567890",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Cliente created successfully");
  });

  // Test para obtener lista de citas
  it("Debe obtener una lista de citas", async () => {
    const res = await request(app).get("/citas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test para crear una nueva cita
  it("Debe crear una nueva cita", async () => {
    const res = await request(app).post("/citas").send({
      clienteId: 1,
      abogadoId: 2,
      fecha: "2024-09-30",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Cita created successfully");
  });
});
