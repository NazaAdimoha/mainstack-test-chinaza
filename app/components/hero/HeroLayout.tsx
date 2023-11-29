

import LineChart from "../Chart"
import Balance from "./Balance"

export const HeroLayout = () => {
    return (
        
            <div className="pt-4 flex flex-col md:flex-row md:justify-between md:gap-4 ">
                <div className="max-w-3xl max-h-64">
                    <LineChart />
                </div>

                <div>
                    <Balance />
                </div>
            </div>
        
    )
}