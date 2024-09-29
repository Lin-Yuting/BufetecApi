const request  = require("supertest");
const app = require("../index");
const sequelize = require("../config/database");

beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Abre la conexión antes de las pruebas
    console.log("Database connection established for testing.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});

afterAll(async () => {
  try {
    await sequelize.close(); // Cierra la conexión después de todas las pruebas
    console.log("Database connection closed after testing.");
  } catch (err) {
    console.error("Error closing the database connection:", err);
  }
});

describe("Checking test", () => {
  test("Las pruebas funcionan", async () => {
    const res = await request(app).get("/test").send();
    expect(res.statusCode).toBe(200);
  });
})

describe("API User Endpoints", () => {

  let userToken = "";
  let userId = "";

  // Test para registrar un usuario
  test("Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/api/users/register").send({
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
  test("Debe hacer login correctamente con credenciales válidas", async () => {
    const res = await request(app).post("/api/users/login").send({
      user_email: "valeria@example.com",
      password: "password123",
    });

    console.log(res)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User logged in");
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });

  // Test para obtener todos los usuarios
  test("Debe obtener una lista de usuarios", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test para eliminar un usuario
  test("Debe eliminar un usuario", async () => {
    const res = await request(app)
      .delete(`/api/users/delete/valeria@example.com`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");
  });
});

describe("API Catalogo Endpoints", () => {
  // Test para obtener la lista de clientes
  it("Debe obtener una lista de clientes", async () => {
    const res = await request(app).get("/api/users/clientes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // // Test para crear un nuevo cliente
  // it("Debe crear un nuevo cliente", async () => {
  //   const res = await request(app).post("/api/users/clientes").send({
  //     nombre: "Juan Perez",
  //     direccion: "Av. Siempre Viva",
  //     telefono: "1234567890",
  //   });

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty("message", "Cliente created successfully");
  // });

  // Test para obtener lista de citas
  it("Debe obtener una lista de citas", async () => {
    const res = await request(app).get("/api/users/citas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // // Test para crear una nueva cita
  // it("Debe crear una nueva cita", async () => {
  //   const res = await request(app).post("/api/users/citas").send({
  //     clienteId: 1,
  //     abogadoId: 2,
  //     fecha: "2024-09-30",
  //   });

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty("message", "Cita created successfully");
  // });
});
