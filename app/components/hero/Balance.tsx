// Desc: This file contains the balance component

import { paymentData } from "@/data/paymentData"
import Image from "next/image"
import Info from "../../../public/info.svg"

const Balance = () => {
  return (
    <div className="">
        
            <div className="flex flex-col w-full items-start lg:gap-14">
                {
                   paymentData && paymentData?.map((item, index) => (
                        <div key={index} className="">
                            <div className="flex justify-between items-center lg:gap-16">
                                <div className="rounded-md  mr-2 gap-4">
                                    <p className="text-start text-[#56616B] text-sm font-medium leading-4">{item.paymentTitle}</p>
                                    <p className="text-start text-[#131316] text-lg font-bold leading-9">USD {item.amount}</p>
                                </div>
                                <Image className="flex items-center" src={Info} alt="Info Icon" width={20} height={20} />
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
  )
}

export default Balance
