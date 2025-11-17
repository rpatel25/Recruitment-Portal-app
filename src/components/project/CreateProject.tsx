import {
  useCreateProjectMutation,
  useGetUsersInCompanyQuery,
} from "@/store/services/ApiRequest";
import { classNames } from "@/util/classNames";
import { seniorityOptions } from "@/util/data";
import { OptimizeArray, OptimizeMSArray } from "@/util/OptimizeArray";
import { FormValues } from "@/util/Types";
import { Button, cn } from "@heroui/react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IProps {
  setIsCreationActive: (val: boolean) => void;
}

export const CreateProject = ({ setIsCreationActive }: IProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[] | never[]>([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { data } = useGetUsersInCompanyQuery();
  const currentCompany = data?.data.company;
  const users = data?.data.user ?? [];
  const [createProject] = useCreateProjectMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createProject({ ...data, status: "active" });
    setIsCreationActive(false);
  };

  return (
    <div
      className={cn(
        "w-full h-[85vh] p-6",
        "bg-white shadow-md text-black",
        "rounded-2xl border border-gray-200"
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className={cn(classNames.flexBetween, "mb-8")}>
          <h3 className={classNames.baseHeaderText}>Create a new project</h3>

          <div className="flex items-center gap-3">
            <Button
              variant="solid"
              startContent={<img src="/icons/filter_close.svg" />}
              onPress={() => setIsCreationActive(false)}
              className={cn(
                "bg-[#E6E9FF] text-[#3B4CBF] text-sm font-medium",
                "rounded-lg border border-solid border-[#6776E0] "
              )}
            >
              Discard
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
              startContent={<img src="/icons/candidate.svg" />}
            >
              Lookout for Candidates
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "bg-[#f5f5f5cc]",
            "rounded-2xl border border-solid border-[#DDDFE3]",
            "py-5 px-8"
          )}
        >
          <h3 className="text-[#323130] text-base font-medium mb-4">
            Project Details
          </h3>

          <div className="mb-4">
            <label className={classNames.projectLabelStyle}>
              Project Name *
            </label>
            <InputText
              placeholder="Enter Project Name"
              {...register("name", { required: "Name is required" })}
              className={classNames.projectInputStyle}
              pt={{ root: { className: "custom-placeholder" } }}
            />
            {errors.name && (
              <p className="text-[#D94439] text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className={cn(classNames.flexBetween, "gap-6 mb-4")}>
            <div className="w-full">
              <label className={classNames.projectLabelStyle}>
                Job Title *
              </label>
              <InputText
                placeholder="Enter Job Title"
                {...register("job_title", {
                  required: "Job title is required",
                })}
                className={classNames.projectInputStyle}
                pt={{ root: { className: "custom-placeholder" } }}
              />
              {errors.job_title && (
                <p className="text-[#D94439] text-sm">
                  {errors.job_title.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className={classNames.projectLabelStyle}>
                Job Location
              </label>
              <InputText
                placeholder="Enter Job Location"
                {...register("job_location")}
                className={classNames.projectInputStyle}
                pt={{ root: { className: "custom-placeholder" } }}
              />
              {errors.job_location && (
                <p className="text-[#D94439] text-sm">
                  {errors.job_location.message}
                </p>
              )}
            </div>
          </div>

          <div className={cn(classNames.flexBetween, "gap-6 mb-4")}>
            <div className="w-full">
              <label className={classNames.projectLabelStyle}>
                Seniority Level *
              </label>
              <Controller
                name="seniority"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={OptimizeArray(seniorityOptions)}
                    placeholder="Select Seniory Level"
                    {...register("seniority", {
                      required: "Seniority Level is required",
                    })}
                    optionLabel="label"
                    optionValue="value"
                    className={cn(
                      "w-full h-9 px-2 flex items-center",
                      "border border-solid border-[#3B4CBF] rounded-lg",
                      "text-[#323130] text-sm font-medium"
                    )}
                    // pt={{ root: { className: "custom-dropdown" } }}
                  />
                )}
              />

              {errors.seniority && (
                <p className="text-[#D94439] text-sm">
                  {errors.seniority.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className={classNames.projectLabelStyle}>
                Company Hiring for *
              </label>
              <InputText
                value={currentCompany}
                placeholder="Enter Company"
                {...register("company_hiring_for")}
                className={cn(classNames.projectInputStyle, " opacity-70")}
                pt={{ root: { className: "custom-placeholder" } }}
              />
              {errors.company_hiring_for && (
                <p className="text-[#D94439] text-sm">
                  {errors.company_hiring_for.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className={classNames.projectLabelStyle}>
              Project Description
            </label>
            <InputTextarea
              placeholder="Enter Project Description"
              {...register("description", {
                required: "Description is required",
              })}
              className={cn(
                "w-full h-24 p-2",
                classNames.inputBorder,
                classNames.labelText
              )}
              pt={{ root: { className: "custom-placeholder" } }}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center gap-6 mb-3">
            <div>
              <label className={classNames.projectLabelStyle}>
                Project Members
              </label>
              <Controller
                name="members"
                control={control}
                render={() => (
                  <MultiSelect
                    options={OptimizeMSArray(users)}
                    {...register("members")}
                    value={selectedUsers}
                    onChange={(e) => setSelectedUsers(e.value)}
                    optionLabel="members"
                    placeholder="Select Users"
                    filter
                    className={cn(
                      "w-full h-9 px-2 flex items-center opacity-70",
                      "border border-solid border-[#3B4CBF] rounded-lg",
                      "text-[#323130] text-sm font-medium"
                    )}
                    maxSelectedLabels={0}
                    selectedItemTemplate={() =>
                      selectedUsers?.length > 0 ? (
                        <></>
                      ) : (
                        <p>Select Project Members</p>
                      )
                    }
                  />
                )}
              />

              <div className="flex flex-row gap-1 mt-2 flex-wrap">
                {selectedUsers.map((each) => (
                  <p
                    className={cn(
                      "bg-[#EBEDF9] px-2 py-1",
                      "rounded",
                      "text-nowrap text-black text-xs"
                    )}
                  >
                    {each}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className={classNames.projectLabelStyle}>
                Project Access
              </label>

              <div className="flex gap-4">
                <label
                  className={cn(
                    classNames.labelText,
                    "flex items-center gap-2"
                  )}
                >
                  <input
                    type="radio"
                    value="private"
                    {...register("access", { required: "Access is required" })}
                  />
                  Private{" "}
                  <span className="text-[#706F6E] text-xs font-normal">
                    (Members of this Project)
                  </span>
                </label>
                <label
                  className={cn(
                    classNames.labelText,
                    "flex items-center gap-2"
                  )}
                >
                  <input
                    type="radio"
                    value="public"
                    {...register("access", { required: "Access is required" })}
                  />
                  Public{" "}
                  <span className="text-[#706F6E] text-xs font-normal">
                    (All Recruiters)
                  </span>
                </label>
              </div>
              {errors.access && (
                <p className="text-red-500">{errors.access.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              size="sm"
              variant="solid"
              onPress={() => setIsCreationActive(false)}
              className={cn(
                "bg-[#FFF] shadow-[0_0_6px_0_rgba(0,0,0,0.20)] p-4",
                "rounded-lg text-[#3B4CBF] text-sm font-medium"
              )}
            >
              Cancel
            </Button>

            <Button
              size="sm"
              type="submit"
              variant="solid"
              className={cn(
                "bg-[#3B4CBF] shadow-[0_0_6px_0_rgba(0,0,0,0.20)] p-4",
                "rounded-lg text-white text-sm font-medium"
              )}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
