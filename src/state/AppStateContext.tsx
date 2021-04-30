import { createContext, useContext, Dispatch, useEffect, FC } from "react"
import { Action } from "./actions"
import {
    appStateReducer,
    AppState,
    List,
    Task
} from "./appStateReducer"
import {useImmerReducer} from "use-immer"
import {DragItem} from "../DragItem"
import {save} from "../api"
import {withInitialState} from "../withInitialState"

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appData: AppState = {
    draggedItem: null,
    lists: []
}
type AppStateProviderProps = {
    children: React.ReactNode
    initialState: AppState
}
type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}
export const AppStateProvider = withInitialState<AppStateProviderProps>(
    ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(
        appStateReducer,
        initialState
    )
    useEffect(() => {
        save(state)
    }, [state])
    const { draggedItem, lists } = state
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }
    return (
        <AppStateContext.Provider
            value={{ draggedItem, lists, getTasksByListId, dispatch }}
        >
            {children}
        </AppStateContext.Provider>
    )
})
export const useAppState = () => {
    return useContext(AppStateContext)
}