import { Button } from '@heroui/react'
import React, { useState } from 'react'

type Props ={
    onClose: () => void;
}

const ExamSidebar: React.FC<Props>  = ({ onClose }) => {
  return (
    <div>
        <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>

          {/* side navigation panel */}
          <aside className="fixed left-0 top-0 z-50 rounded-l-2xl h-full w-100 bg-white shadow-lg overflow-auto">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex gap-3">
                <img src="/icons/squarecube_gray.svg" alt="squarecube_gray" className="w-auto h-11 my-1"/>
                <div className="flex flex-col justify-center">
                  <span className="text-black text-lg font-semibold">Front End Developer</span>
                  <span className="text-black text-sm">Jhon Cook</span>
                </div>
              </div>
              <Button
                onClick={onClose}
                aria-label="Close navigation"
                className="px-2 hover:bg-gray-50 rounded-full w-8 h-8"
              >
                <img src="/icons/close_icon_blue.svg" alt="close_icon_blue" className="w-3 h-3" />
              </Button>
            </div>
            <div className="px-6 flex items-center gap-4">
              <img src="/icons/progressbar_blue_30.svg" alt="progressbar_blue_30" className="w-70"/>
              <span className="text-black text-sm">30%</span>
            </div>
            <div className="px-5 py-6">
              <div className="flex justify-between w-85">
                <div className="text-black flex items-center gap-2"><span className="font-semibold">Level 01</span>
                  <div className="bg-gradient-to-r from-[#483FC5] to-[#864CEF] w-20 h-5 rounded-full flex items-center justify-center gap-1">
                    <img src="/icons/circle_white.svg" alt="circle_white" className="w-3 h-3"/><span className="text-white text-xs">MCQ only</span>
                  </div>  
                </div> 
                <img src="/icons/down_arrow_black.svg" alt="down_arrow_black" className="w-4 h-4" />
              </div>
              <div className="p-2 bg-[#C8D2FF] w-82 h-11 flex items-center justify-between rounded-lg my-4">
                <span className="px-2 text-black text-s"> 1. Lorem ipsum Dolar sit amet </span>
                <img src="/icons/tick_circle_black.svg" alt="tick_circle_black" className="w-4 h-4"/>
              </div>
              <div className="p-2 w-82 h-11 rounded-lg my-5 flex items-center justify-between">
                <span className="px-2 text-black text-s"> 2. Lorem ipsum Dolar sit amet </span>
                <img src="/icons/tick_circle_green.svg" alt="tick_circle_green" className="w-4 h-4"/>
              </div>
              <div className="p-2 w-82 h-11 rounded-lg flex items-center justify-between">
                <span className="px-2 text-black text-s"> 3. Lorem ipsum Dolar sit amet </span>
                <img src="/icons/tick_circle_green.svg" alt="tick_circle_green" className="w-4 h-4"/>
              </div>
            </div>
            <div className="px-5">
              <div className="flex justify-between w-85">
                <div className="text-black flex items-center gap-2 "><span className="font-semibold">Level 02</span>
                  <div className="bg-gradient-to-r from-[#483FC5] to-[#864CEF] w-30 h-5 rounded-full flex items-center justify-center gap-1">
                    <img src="/icons/circle_white.svg" alt="circle_white" className="w-3 h-3"/><span className="text-white text-xs">Coding questions</span>
                  </div>  
                </div> 
                <img src="/icons/down_arrow_black.svg" alt="down_arrow_black" className="w-4 h-4" />
              </div>
              <div className="p-2 w-82 h-11 flex items-center rounded-lg my-4">
                <span className="px-2 text-black text-s"> 1. Lorem ipsum Dolar sit amet </span>
              </div>
              <div className="p-2 w-82 h-11 rounded-lg my-5">
                <span className="px-2 text-black text-s"> 2. Lorem ipsum Dolar sit amet </span>
              </div>
              <div className="p-2  w-82 h-11 rounded-lg my-5">
                <span className="px-2 text-black text-s"> 3. Lorem ipsum Dolar sit amet </span>
              </div>
            </div>
          </aside>
    </div>
  )
}

export default ExamSidebar