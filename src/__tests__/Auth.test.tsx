import { rest } from "msw"
import { setupServer } from "msw/node"
import { fireEvent, screen, act, waitFor } from "@testing-library/react"
import App from "../components/App"
import { renderWithProviders } from "../utils/testUtils"
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event"


export const handlers = [
    rest.get("/api/auth", (req, res, ctx) => {
        return res(ctx.json("john smith"), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("Admin - Testing start screen and login button", async () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByRole("link", { name: "Admin Page" }))
    expect(screen.getByText(/You are not logged in/i)).toBeInTheDocument()

    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    userEvent.type(screen.getByTestId(/email/i), "test@localhost.com")
    userEvent.type(screen.getByTestId(/password/i), "password")
    userEvent.click(screen.getByTestId(/submit/i))

    waitFor(() => {
        expect(screen.getByText(/Welcome test@localhost.com/i)).toBeInTheDocument()
        expect(setItem).toHaveBeenCalled()
    })
})

test("Admin - Logout", async () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByRole('link', { name: /Admin Page/i }))

    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    userEvent.type(screen.getByTestId(/email/i), "test@localhost.com")
    userEvent.type(screen.getByTestId(/password/i), "password")
    fireEvent.click(screen.getByTestId(/submit/i))

    waitFor(() => {
        expect(setItem).toHaveBeenCalled()

        fireEvent.click(screen.getByTestId(/logout/i))
        expect(setItem).not.toHaveBeenCalled()
    })
})
