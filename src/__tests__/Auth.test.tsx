import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { fireEvent, screen, act, waitFor } from "@testing-library/react"
import { App } from "../App"
import { renderWithProviders } from "../utils/testUtils"
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event"
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers"


const APP_NAME = "Silva Client"

export const handlers = [
    rest.get("/api/auth", (req, res, ctx) => {
        return res(ctx.json("john smith"), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("Testing start screen and login button", async () => {
    renderWithProviders(<App />)
    
    // We wait until the text "Silva Client" is in the document. If it isn't, it's an error.
    expect(screen.getByText(APP_NAME)).toBeInTheDocument()
    expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: /Admin Page/i }))
    expect(screen.getByText(/You are not logged in/i)).toBeInTheDocument()

    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    userEvent.type(screen.getByTestId("email"), "test@localhost.com")
    userEvent.type(screen.getByTestId("password"), "password")
    act(() => fireEvent.click(screen.getByTestId("submit")))

    waitFor(() => {
        expect(screen.getByText(APP_NAME)).toBeInTheDocument()
        expect(screen.getByText("Welcome")).toBeInTheDocument()
        expect(setItem).toHaveBeenCalled()
    })
    
})

test("Logout", async () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByRole('link', { name: /Admin Page/i }))

    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    userEvent.type(screen.getByTestId("email"), "test@localhost.com")
    userEvent.type(screen.getByTestId("password"), "password")
    act(() => fireEvent.click(screen.getByTestId("submit")))

    waitFor(() => {
        expect(setItem).toHaveBeenCalled()

        act(() => fireEvent.click(screen.getByTestId("logout")))
        expect(setItem).not.toHaveBeenCalled()

    })

})
