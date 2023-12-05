import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "phosphor-react";

const DateRangePicker = ({ onDateRangeChange, placeholder }: any) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    if (onDateRangeChange) {
      onDateRangeChange({ start, end });
    }
  };

  return (
    
    <div className="relative h-10 p-2 bg-gradient-to-r from-gray-200 to-white rounded-lg shadow-inner">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: any) => {
          setDateRange(update);
          handleDateChange(update);
        }}
        isClearable={true}
        customInput={
          <div className="flex items-center justify-end">
            <input
              value={startDate && endDate ? `${startDate} - ${endDate}` : ""}
              className="w-40 border-none bg-transparent text-gray-700 placeholder-gray-500"
              onClick={() => {}}
              placeholder={placeholder}
            />
            <Calendar className="ml-2 cursor-pointer" />
          </div>
        }
        dayClassName={() => "example-datepicker-day-class"}
        popperClassName="example-datepicker-class"
        maxDate={new Date()}
      />
    </div>
  );
};

export default DateRangePicker;