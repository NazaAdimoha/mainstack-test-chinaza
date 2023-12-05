import { set } from "date-fns";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";
import Image from "next/image";
import { Repeat } from "phosphor-react";
import Close from "../../../public/close.svg";
import DateRangePicker from "@/utils/datePicker";
import ReactSelect from "react-select";
import ReactModal from "react-modal";

interface SubFilterProps {
    onClose: () => void;
    onApply: (filters: any) => void;
  }

const SubFilter = ({
    onClose,
    onApply,
}: SubFilterProps) => {
    const [initialFilterValues, setInitialFilterValues] = useState<any>({
        startDate: null,
        endDate: null,
        status: "",
        type: "",
    });

    const statusOptions = ["successful", "failed", "pending"];
    const typeOptions = ["deposit", "withdrawal", "other"];

    const handleFilterByDate = (dateRange: any) => {
        const { start, end } = dateRange;
        setInitialFilterValues((prevState: any) => ({
            ...prevState,
            startDate: moment(start).format("YYYY-MM-DD"),
            endDate: moment(end).format("YYYY-MM-DD"),
        }))
    };

    const handleFilterByStatus = (selectedOption: any) => {
        const statusValue = selectedOption ? selectedOption.value : "";
        setInitialFilterValues((prevState: any) => ({
            ...prevState,
            status: statusValue,
        }))
    };

    const handleFilterByType = (selectedOption: any) => {
        const typeValue = selectedOption ? selectedOption.value : "";
        setInitialFilterValues((prevState: any) => ({
            ...prevState,
            type: typeValue,
        }))
    };

    const handleApply = () => {
        onApply(initialFilterValues);
        onClose();
    };

    const handleReset = () => {
        setInitialFilterValues({
            startDate: null,
            endDate: null,
            status: "",
            type: "",
        });
    };


    return (
        <>
            <div className="absolute top-1/2 left-1/2 text-center origin-center overflow-y-scroll">
                <ReactModal 
                    isOpen={true}
                    onRequestClose={onClose}
                    ariaHideApp={false}
                    className="w-[500px] h-[500px] bg-white rounded-lg shadow-lg outline-none"
                    style={{
                        overlay: {
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(51, 51, 51, 0.24)",
                          overflowY: "auto",
                        },
                        content: {
                          position: "absolute",
                          inset: "15% 29%",
                          border: "1px solid #fff",
                          filter: "drop-shadow(0px 4px 8px rgba(51, 51, 51, 0.08))",
                          WebkitOverflowScrolling: "touch",
                          borderRadius: "8px",
                          outline: "none",
                          padding: "35px",
                          width: "25rem",
                          boxShadow: "0px 8px 16px 0px rgba(51, 51, 51, 0.08)",
                          maxHeight: "100vh",
                          zIndex: "1",
                          overflow: "hidden",
                          background:"#FFF",
                        },
                      }}
                >
                    <div className="flex justify-between items-center">
                        <p className="text-[#131316] text-lg font-bold leading-9">Filter</p>
                        <button onClick={onClose} className="focus:outline-none">
                            <Image
                                className="flex items-center"
                                src={Close}
                                alt="Close Icon"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p className="text-[#56616B] text-sm font-medium leading-4">Date Range</p>
                            <button onClick={handleReset} className="focus:outline-none">
                                <Repeat onClick={handleReset} className="cursor-pointer" size={20} />
                            </button>
                        </div>
                        <DateRangePicker
                            onDateRangeChange={handleFilterByDate}
                            placeholder="Select Date Range"
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-6 w-full">
                        <p className="text-[#56616B] text-sm font-medium leading-4">Status</p>
                        <ReactSelect
                            value={
                                initialFilterValues.status
                                    ? {
                                        value: initialFilterValues.status,
                                        label: initialFilterValues.status,
                                    }
                                    : ""
                            }
                            onChange={handleFilterByStatus}
                            options={statusOptions.map((option) => ({
                                value: option,
                                label: option,
                            }))}
                            className="w-full h-10 p-2 bg-gradient-to-r from-gray-200 to-white rounded-lg shadow-inner"
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                        <p className="text-[#56616B] text-sm font-medium leading-4">Type</p>
                        <ReactSelect
                            value={
                                initialFilterValues.type
                                    ? {
                                        value: initialFilterValues.type,
                                        label: initialFilterValues.type,
                                    }
                                    : ""
                            }
                            onChange={handleFilterByType}
                            options={typeOptions.map((option) => ({
                                value: option,
                                label: option,
                            }))}
                            className="w-full h-10 p-2 bg-gradient-to-r from-gray-200 to-white rounded-lg shadow-inner"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button onClick={handleApply} className="focus:outline-none">
                            <p className="text-[#131316] text-lg font-bold leading-9">Apply</p>
                        </button>
                        <button onClick={handleReset} className="focus:outline-none">
                            <p className="text-[#131316] text-lg font-bold leading-9">Reset</p>
                        </button>
                    </div>
                </ReactModal>
            </div>
        </>
    )
}

export default SubFilter;