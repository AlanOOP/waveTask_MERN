import { ReactNode } from "react"


const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-red-200 p-3 border-l-4 border-red-500 text-red-500 font-bold text-sm font-roboto">
            {children}
        </div>
    )
}

export default ErrorMessage