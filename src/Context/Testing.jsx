import { createContext } from "react";

export const TestContext = createContext(null);

export const TestProvider = ({children}) => {
    return(
        <TestContext.Provider>
        {children}
        </TestContext.Provider>
    )
}