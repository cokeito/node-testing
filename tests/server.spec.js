const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it('get a server status 200 and an object with at least 1 item', async () => {
    const res = await request(server).get("/cafes");
    const { body } = res;
    expect(res.status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('get a server status 404 if try to delete a cafe without a non existing id and adding a jwt header token', async () => {
    const jwt = "1234567890";
    const randomId = Math.floor(Math.random() * 1000);
    const res = await request(server).delete("/cafes/" + randomId).set("Authorization", jwt);
    expect(res.status).toBe(404);
  });

  it('insert a new coffee with a random id', async () => {
    const newCoffee = {
      id: Math.floor(Math.random() * 1000),
      nombre: "Ice Frappe",
    }

    const res = await request(server).post("/cafes").send(newCoffee);
    expect(res.status).toBe(201);
  });

  it('get a server status 400 if try to PUT (update) a coffee sending an id different than the payload id', async () => {
    const updatedCoffee = {
      id: Math.floor(Math.random() * 1000),
      nombre: "Mocha",
    }

    const res = await request(server).put("/cafes/" + (updatedCoffee.id + 1)).send(updatedCoffee);
    expect(res.status).toBe(400);
  });


});
