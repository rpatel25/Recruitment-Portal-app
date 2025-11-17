import { Button } from "@heroui/react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "@/store/services/ApiRequest";
import { create_talent_base, save_candidate } from "@/services/TalentBase";
import { IProjectType } from "@/types/project.type";

interface SaveCandidateDialogProps {
  visible: boolean;
  onHide: () => void;
  candidate_ids: string[];
  sessionid: string;
}

export default function SaveCandidateDialog({
  visible,
  onHide,
  candidate_ids,
  sessionid,
}: SaveCandidateDialogProps) {
  const [selectedOption, setSelectedOption] = useState<"create" | "choose">(
    "create"
  );
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    company_hiring_for: "",
  });
  const [selectedProject, setSelectedProject] = useState<IProjectType | null>(
    null
  );
  const [createProject] = useCreateProjectMutation();
  const { data: projectsData, isLoading } = useGetProjectsQuery();

  const handleConfirm = async () => {
    if (selectedOption === "create") {
      const response = await createProject({
        ...formData,
        status: "active",
        access: "private",
        job_location: "",
      });
      if (response && response.data) {
        console.log(response.data);
        console.log(response.data.data.id);
        const project_id = response.data.data.id;

        const talent_base_response = await create_talent_base(
          project_id,
          candidate_ids,
          sessionid
        );
        if (talent_base_response && talent_base_response.data) {
          console.log(talent_base_response.data);
        }
      }
    } else {
      if (selectedProject && selectedProject._id) {
        const response = await save_candidate(
          selectedProject._id,
          candidate_ids
        );
        if (response && response.data) {
          console.log(response.data);
        }
      }
    }
    onHide();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filter projects based on search text
  // const filterProjects = (value: string) => {
  //   if (!projectsData?.data) return [];

  //   return projectsData.data.filter((project: IProjectType) => {
  //     const searchText = value.toLowerCase();
  //     return (
  //       project.name.toLowerCase().includes(searchText) ||
  //       project.job_title.toLowerCase().includes(searchText) ||
  //       project.company_hiring_for.toLowerCase().includes(searchText)
  //     );
  //   });
  // };

  // Custom item template for the dropdown
  const itemTemplate = (option: IProjectType) => {
    return (
      <div className="flex flex-col p-2">
        <div className="text-[#323130] text-sm font-medium">
          {option.name} - {option.job_title}
        </div>
        <div className="text-[#706F6E] text-xs">
          {option.company_hiring_for}
        </div>
      </div>
    );
  };

  // Custom value template for the dropdown
  const valueTemplate = (option: IProjectType) => {
    if (!option)
      return <span className="text-[#706F6E]">Select a project</span>;
    return (
      <div className="flex flex-col">
        <div className="text-[#323130] text-sm font-medium">
          {option.name} - {option.job_title}
        </div>
        <div className="text-[#706F6E] text-xs">
          {option.company_hiring_for}
        </div>
      </div>
    );
  };

  return (
    <Dialog
      header="Save Candidate"
      headerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#323130",
        fontSize: "20px",
        fontWeight: 500,
        lineHeight: "28px",
      }}
      visible={visible}
      style={{
        width: "35vw",
        borderRadius: "16px",
        border: "1px solid #C0C0C0",
      }}
      onHide={onHide}
      draggable={false}
      footer={
        <div className="px-4 pt-4 flex items-center justify-end gap-3">
          <Button
            color="primary"
            variant="light"
            className="text-[#3B4CBF] text-sm font-medium"
            onPress={onHide}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="solid"
            className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
            onPress={handleConfirm}
            isDisabled={selectedOption === "choose" && !selectedProject}
          >
            Continue
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="text-[#323130] text-base mb-2">
          Choose how you would like to save this candidate:
        </p>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="saveOption"
              value="create"
              checked={selectedOption === "create"}
              onChange={(e) =>
                setSelectedOption(e.target.value as "create" | "choose")
              }
              className="w-4 h-4 text-[#3B4CBF] border-[#C0C0C0] focus:ring-[#3B4CBF]"
            />
            <div className="flex flex-col">
              <span className="text-[#323130] text-sm font-medium">
                Create Project
              </span>
              <span className="text-[#706F6E] text-xs">
                Create a new project to save this candidate
              </span>
            </div>
          </label>

          {/* Expandable form for Create Project */}
          {selectedOption === "create" && (
            <div className="mt-4 p-4 bg-[#f5f5f5cc] rounded-lg border border-[#DDDFE3]">
              <h4 className="text-[#323130] text-sm font-medium mb-3">
                Project Details
              </h4>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-[#323130] text-xs font-medium mb-1">
                    Project Name *
                  </label>
                  <InputText
                    placeholder="Enter Project Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-2 border border-[#C0C0C0] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#323130] text-xs font-medium mb-1">
                    Job Title *
                  </label>
                  <InputText
                    placeholder="Enter Job Title"
                    value={formData.job_title}
                    onChange={(e) =>
                      handleInputChange("job_title", e.target.value)
                    }
                    className="w-full p-2 border border-[#C0C0C0] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#323130] text-xs font-medium mb-1">
                    Company Hiring For *
                  </label>
                  <InputText
                    placeholder="Enter Company"
                    value={formData.company_hiring_for}
                    onChange={(e) =>
                      handleInputChange("company_hiring_for", e.target.value)
                    }
                    className="w-full p-2 border border-[#C0C0C0] rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="saveOption"
              value="choose"
              checked={selectedOption === "choose"}
              onChange={(e) =>
                setSelectedOption(e.target.value as "create" | "choose")
              }
              className="w-4 h-4 text-[#3B4CBF] border-[#C0C0C0] focus:ring-[#3B4CBF]"
            />
            <div className="flex flex-col">
              <span className="text-[#323130] text-sm font-medium">
                Choose Project
              </span>
              <span className="text-[#706F6E] text-xs">
                Select an existing project to save this candidate
              </span>
            </div>
          </label>

          {/* Expandable dropdown for Choose Project */}
          {selectedOption === "choose" && (
            <div className="mt-4 p-4 bg-[#f5f5f5cc] rounded-lg border border-[#DDDFE3]">
              <h4 className="text-[#323130] text-sm font-medium mb-3">
                Select Project
              </h4>

              <div>
                <label className="block text-[#323130] text-xs font-medium mb-1">
                  Project *
                </label>
                <div className="relative w-full">
                  <Dropdown
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.value)}
                    options={projectsData?.data || []}
                    optionLabel="name"
                    placeholder="Type to search projects..."
                    filter
                    filterBy="name,job_title,company_hiring_for"
                    itemTemplate={itemTemplate}
                    valueTemplate={valueTemplate}
                    className="w-full"
                    panelStyle={{
                      width: "auto",
                      minWidth: "100%",
                      left: "0 !important",
                      right: "auto !important",
                    }}
                    showClear
                    loading={isLoading}
                    emptyMessage="No projects found"
                    emptyFilterMessage="No projects match your search"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
