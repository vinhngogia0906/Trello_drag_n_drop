import {FC} from "react"
import {Column} from "./Column"
import {Card} from "./Card"
import {AppContainer} from "./styles"
import { fileURLToPath } from "node:url"
import { AddNewItem } from "./AddNewItem"


export const App: FC = ({children}) => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold" />
      </Column>

      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>

      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
      
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  )
}