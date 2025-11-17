import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetQuestionsForAssessmentQuery,
} from "@/store/services/ApiRequest";
import Exam from "@/components/Assessment/Exam";
import { IAssessmentQuestins } from "@/types/assessment.type";

export const Screening = () => {
  const router = useRouter();

  const { id } = router.query;
  const assessmentId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";
  useGetQuestionsForAssessmentQuery(assessmentId);

  const [questions] = useState<IAssessmentQuestins[]>([
    {
      question_id: "bc7c0cd8-14cf-490f-a089-64c1c24e21bc",
      question_data: {
        id: "q1-react-001",
        title: "Understanding State Management in React",
        difficulty: "medium",
        time_limit_min: 10,
        question_type: "mcq",
        prompt:
          "In a React application using Context API for state management, which of the following statements is true about the use of the Context Provider?",
        starter_code: null,
        assets: [],
        expected_concepts: ["React", "Context API", "state management"],
        answer_guidance:
          "The Context Provider must wrap the components that need access to the context.",
        rubric_id: "rubric-001",
      },
      question:
        "In a React application using Context API for state management, which of the following statements is true about the use of the Context Provider?",
      answer: "",
      result: {},
    },
    {
      question_id: "2fd34118-12b5-476c-a53f-f09442aca1f5",
      question_data: {
        id: "q2-react-002",
        title: "Debugging a React Component",
        difficulty: "hard",
        time_limit_min: 15,
        question_type: "debug",
        prompt:
          "You have a React component that is not rendering correctly. The component fetches data from an API and displays it. Identify the error in the following code snippet and suggest a fix.",
        starter_code:
          "import React, { useEffect, useState } from 'react';\n\nconst DataComponent = () => {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    fetch('https://api.example.com/data')\n      .then(response => response.json())\n      .then(data => setData(data));\n  }, []);\n\n  return <div>{data.title}</div>;\n};\n\nexport default DataComponent;",
        assets: [],
        expected_concepts: ["React", "debugging", "API integration"],
        answer_guidance:
          "The code assumes 'data' is always defined. You should check if 'data' is not null before accessing 'data.title'.",
        rubric_id: "rubric-002",
      },
      question:
        "You have a React component that is not rendering correctly. The component fetches data from an API and displays it. Identify the error in the following code snippet and suggest a fix.",
      answer: "",
      result: {},
    },
  ]);

  useEffect(() => {
  });

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className=" flex items-start gap-6"
      style={{
        background: "#F0F6FF",
      }}
    >
      <Exam
        questions={questions}
        onSubmit={(answers) => alert(JSON.stringify(answers, null, 2))}
      />
    </div>
  );
};
