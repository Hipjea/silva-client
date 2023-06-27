import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import { RenderOptions } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import type { RootState } from "../store"
import authSlice from "../slices/authSlice"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<any>
    store?: any
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({ reducer: { auth: authSlice }, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{ children }</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}