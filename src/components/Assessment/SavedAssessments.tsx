import React from "react";
import { Button } from "@heroui/react";

export const SavedAssessments = () => {

  return (
    <>
      <div className="flex flex-col py-2 gap-4">
        <div className="p-1 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-xl">
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                <h1 className="font-medium">Frontend Assessment Microsoft</h1>
                <Button className="ml-4 text-white bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-xl p-4">
                    See full assessment
                    <img src="icons/right_arrow_white.svg" alt="right_arrow_white" className="w-4 h-4" />
                </Button>
            </div>
        </div>
        <div className="p-1 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-xl">
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                <h1 className="font-medium">Frontend Assessment Microsoft</h1>
                <Button className="ml-4 text-white bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-xl p-4">
                    See full assessment
                    <img src="icons/right_arrow_white.svg" alt="right_arrow_white" className="w-4 h-4" />
                </Button>
            </div>
        </div>
        <div className="p-1 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-xl">
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                <h1 className="font-medium">Frontend Assessment Microsoft</h1>
                <Button className="ml-4 text-white bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-xl p-4">
                    See full assessment
                    <img src="icons/right_arrow_white.svg" alt="right_arrow_white" className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default SavedAssessments;