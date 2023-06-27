import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { fireEvent, screen } from "@testing-library/react"
import { App } from "../App"
import { renderWithProviders } from "../utils/testUtils"

export const handlers = [
    rest.get("/api/auth", (req, res, ctx) => {
        return res(ctx.json("john smith"), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("fetches & receives a user clicking the fetch user button", async () => {
    renderWithProviders(<App />)
    
    expect(screen.getByText(/Silva Client/i)).toBeInTheDocument()
    expect(screen.queryByText(/Welcome/i)).not.tobeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
    expect(screen.getByText(/no user/i)).toBeInTheDocument()

    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
    expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
})