import { createContext } from "react";

export const ExpenseContext = createContext()
export const ExpenseContextProvider = (props) => {

    const value = {

    }

    return (
        <ExpenseContext.Provider value={value}>
            {props.children}
        </ExpenseContext.Provider>
    )
}