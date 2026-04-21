import Elysia from "elysia";

export const getUsersPage = new Elysia()
    .get("/users/:a/:b", async ({status, params:{a, b}, query: { c }}) => {
        return status(201, Number(a) + Number(b) + Number(c))
    })
