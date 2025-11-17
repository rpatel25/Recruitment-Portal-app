import { IAssessmentQuestins } from "@/types/assessment.type";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import React, { useMemo, useState } from "react";
import ExamSidebar from "./ExamSidebar";

export type Choice = {
  id: string | number;
  label: string;
};

export type Question = {
  id: string | number;
  title: string;
  body?: string;
  choices: Choice[];
  required?: boolean;
  type?: "single" | "multi";
};

type ExamProps = {
  questions: IAssessmentQuestins[];
  initialIndex?: number;
  onSubmit?: (answers: Record<string, string | string[]>) => void;
  showProgress?: boolean;
  className?: string;
};

export default function Exam({
  questions,
  initialIndex = 0,
  onSubmit,
  showProgress = true,
  className,
}: ExamProps) {
  const total = questions.length;
  const [index, setIndex] = useState<number>(initialIndex);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  // sidebar state to show navigation panel
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  // completion modal shown when Next clicked on last question
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [showAllowPopup, setShowAllowPopup] = useState<boolean>(true);
  // state for textarea code
  const [codeText, setCodeText] = useState<string>("// Click submit to prints the value 12\n\nconsole.log(12);");
  const question = questions[index];
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLPreElement>(null);

  // Calculate line numbers based on textarea content
  const lineCount = codeText.split('\n').length;

  // Sync scroll between textarea, line numbers, and overlay
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current && overlayRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const goNext = () => {
    if (index < total - 1) setIndex((i) => i + 1);
  };
  
  const handleNextClick = () => {
    // if this is the last question show completion UI instead of advancing
    if (index === total - 1) {
      setShowCompletionModal(true);
      return;
    }
    goNext();
  };

  const handleToggleMulti = (
    questionId: string | number,
    choiceId: string | number
  ) => {
    setAnswers((prev) => {
      const key = String(questionId);
      const existing = (prev[key] as string[]) || [];
      const idx = existing.indexOf(String(choiceId));
      if (idx === -1)
        return { ...prev, [key]: [...existing, String(choiceId)] };
      const copy = existing.slice();
      copy.splice(idx, 1);
      return { ...prev, [key]: copy };
    });
  };

  const handleSelectSingle = (
    questionId: string | number,
    choiceId: string | number
  ) => {
    setAnswers((prev) => ({ ...prev, [String(questionId)]: String(choiceId) }));
  };

  const handleSubmit = () => {
    if (!validateAll()) {
      const firstInvalidIndex = questions.findIndex((ques) => {
        const a = answers[String(ques.question_id)];
        if (Array.isArray(a)) return a.length === 0;
        return !a;
      });

      if (firstInvalidIndex >= 0) setIndex(firstInvalidIndex);
      alert("Please answer all required questions before submitting.");
      return;
    }

    if (onSubmit) onSubmit(answers);
    else console.log("Exam submitted:", answers);
  };

  const validateAll = () => {
    for (const ques of questions) {
      const a = answers[String(ques.question_id)];
      if (Array.isArray(a)) {
        if (a.length === 0) return false;
      } else {
        if (!a) return false;
      }
    }
    return true;
  };

  useMemo(
    () =>
      questions.reduce((acc, cur) => {
        const a = answers[String(cur.question_id)];
        if (Array.isArray(a)) return acc + (a.length > 0 ? 1 : 0);
        return acc + (a ? 1 : 0);
      }, 0),
    [questions, answers]
  );

  return (
    <div className={`w-full h-full ${className ?? ""}`}>
      {/* small top-left "Allow Camera/Mic" popup shown when component mounts */}
      {showAllowPopup && (
        <div className="fixed top-17 inset-0 z-40 bg-black/30">
          <img src="/icons/uparrow_white.svg" alt="uparrow_white" className="w-4 h-4 shadow-lg fixed top-14 left-25" />
          <div
            className="fixed left-18 top-17 z-50 w-75 bg-white shadow-lg rounded-xl px-3 py-2 text-sm"
          >
            <span className="font-medium text-black">Allow Camera/Mic</span>
            <div className="text-[#475569] text-xs mt-1">Allow your camera and microphone to start the test.</div>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowAllowPopup(false)}
                className="px-5 h-9 rounded-full 
                bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90
                text-white text-s mb-1 mt-1"
              >
                Allow
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Completion modal shown when there are no more questions */}
      {showCompletionModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 pointer-events-none select-none"
            onClick={() => setShowCompletionModal(false)}
          />
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] 
            p-0.5 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]
            rounded-xl"
          >
            <div className="bg-white rounded-xl">
              <div className="px-4 flex items-center justify-between border-b-1 border-blue-200">
                  <h4 className="text-black text-lg font-semibold py-4">Question Generation</h4>
                <Button
                  className="hover:text-black text-[#3B4CBF] bg-[#EEF2FF] px-1 w-6 h-6 rounded-full"
                  onClick={() => setShowCompletionModal(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="px-6 py-4">
                <div className="flex flex-col items-center text-sm text-black mt-2">
                    <p>You have successfully completed the assessment.</p>
                    <p>Do you want more questions?</p>
                </div>
                <div className="mt-6 mb-4 flex justify-center gap-4">
                  <Button
                    className="px-8 rounded-xl bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90
                     text-white"
                    onClick={() => {
                      setShowCompletionModal(false);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    className="px-8 rounded-xl border border-blue-200 text-[#3B4CBF] bg-white hover:bg-gray-50"
                    onClick={() => {
                      setShowCompletionModal(false);
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Sidebar overlay + panel */}
      {showSidebar && (
        <>
          {/* backdrop */}
          <ExamSidebar onClose={() => setShowSidebar(false)}/>
        </>
      )}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button className="p-0 m-0" onClick={() => setShowSidebar(true)}>
            <img src="/icons/bullet_list.svg" alt="bullet_list" />
          </Button>
          <div className="border border-blue-200 rounded-lg flex items-center p-2 gap-2">
            <img src="/icons/cogensoft_logo.svg" alt="cogensoft_logo" className="w-27 h-6"/>
            <img src="/icons/close_purple.svg" alt="close_purple" className="w-4 h-4"/>
            <img src="/icons/Main_logo.svg" alt="Main_logo" className="w-30 h-6"/>
          </div>
          <div className="flex items-center gap-2 px-4 py-1 text-sm rounded-lg bg-gray-200 text-gray-700 h-10">
            <img src="/icons/assessment_timer.svg" alt="assessment_timer" className="w-4 h-4" />
            00:00:00
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#22C55E] text-white flex items-center gap-1 px-5 py-1 rounded-full h-8">
            <img src="/icons/bullet_point_white.svg" alt="bullet_point_white" className=" w-2 h-2 mr-1" />
            Level 01
          </div>
          <button
            onClick={goPrev}
            disabled={index === 0}
            className={cn(
              "px-4 py-2 rounded",
              index === 0
                ? "text-gray-300 cursor-not-allowed"
                : "bg-white hover:bg-gray-50"
            )}
          >
          <div className="flex items-center gap-1">
            <img src="/icons/left_arrow_gray.svg" alt="left_arrow_gray" className="w-4 h-4" /> 
            Previous
          </div>
          </button>

          {showProgress && (
            <div className="flex items-center gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3.5 h-3.5 rounded-full border transition ${
                    i === index
                      ? "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  aria-label={`Go to question ${i + 1}`}
                />
              ))}
            </div>
          )}
          <button
            onClick={handleNextClick}
            // keep visual hint when last item
            className="px-4 py-2 rounded text-black bg-white hover:bg-gray-50"
          >
            <div className="flex items-center gap-1">
              Next
              <img src="/icons/right_arrow.svg" alt="right_arrow" className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      <div className="flex p-4 h-[calc(104vh-96px)]">
        <div className="flex w-full border-2 border-blue-100 rounded-xl">
          <div className="w-1/2 bg-white rounded-l-xl p-6 overflow-auto">
            <h2 className="text-2xl font-semibold mb-2 text-[#000000]">
              {question.question_data.title}
            </h2>

            {question.question_data ? (
              question.question_data.rubric_id.includes("\n") ? (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto text-[#000000] whitespace-pre-wrap">
                  {question.question_data.question_type}
                </pre>
              ) : (
                <p className="text-gray-700">{question.question}</p>
              )
            ) : (
              <p className="text-gray-500">No description</p>
            )}
          </div>

          <div className="p-2 bg-[#F1F1F1] flex items-center justify-cente ">
            <img src="/icons/assessment_sixdots.svg" alt="" className="h-5 w-4" />
          </div>

          <div className="w-1/2 bg-white rounded-r-xl p-6 overflow-auto flex flex-col">
            {/*Logic for MCQ Question */}
            {/* <h3 className="text-black text-lg font-semibold mb-4">
              Select one of the following options:
            </h3>

            <div className="space-y-3 flex-1">
              {question.question_data.expected_concepts.map((choice, index) => {
                const isSelected = (() => {
                  const ans = answers[String(question.question_id)];
                  if (question.question_data.question_type === "mcq") {
                    return Array.isArray(ans) && ans.includes(String(choice));
                  }
                  return ans === String(choice);
                })();

                const onClick = () => {
                  if (question.question_data.question_type === "mcq")
                    handleToggleMulti(question.question_id, choice);
                  else handleSelectSingle(question.question_id, choice);
                };

                return (
                  <button
                    key={index}
                    onClick={onClick}
                    className={cn(
                      "w-2/3 text-left p-4 rounded-lg border",
                      "flex items-center gap-3",
                      "focus:outline-none transition",
                      // isSelected
                      //   ? "border-indigo-600 bg-indigo-50"
                      //   : 
                      "border-gray-200 bg-white"
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center",
                          isSelected
                            ? "border-2 border-[#483FC5]"
                            : "bg-gray-50 border-gray-300"
                        )}
                        aria-hidden
                      >
                        {isSelected ? (
                          <svg
                            width="10"
                            height="10"
                            className="rounded-full bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-black text-sm">{choice}</div>
                    </div>
                  </button>
                );
              })}
            </div> */}

            {/*Logic for Coding Question */}
            <div className="-m-6 mb-1"> 
              <div className="flex border border-gray-300">
                {/* Line numbers column */}
                <div
                  ref={lineNumbersRef}
                  className="bg-[#E5E7EB] px-3 py-3 text-[#6B7280] text-sm font-mono select-none overflow-y-auto overflow-x-auto"
                  style={{
                    lineHeight: '24px',
                    minWidth: '40px',
                    height: '456px', // 19 lines * 24px line height
                    scrollbarWidth: 'none'
                  }}
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} style={{ height: '24px' }} className="text-right">
                      {i + 1}
                    </div>
                  ))}
                </div>
                {/* Code editor area */}
                <div className="flex-1 relative bg-white" style={{ maxHeight: '456px' }}>
                  {/* Syntax highlighted overlay */}
                  <pre
                    ref={overlayRef}
                    className="absolute inset-0 m-0 p-3 font-mono text-sm pointer-events-none overflow-auto"
                    style={{
                      lineHeight: '24px',
                      whiteSpace: 'pre',
                      wordWrap: 'normal',
                      height: '456px',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  >
                    {codeText.split('\n').map((line, i) => (
                      <div
                        key={i}
                        style={{ height: '24px' }}
                        className={line.trim().startsWith('//') ? 'text-[#6B7280]' : 'text-black'}
                      >
                        {line || ' '}
                      </div>
                    ))}
                  </pre>
                  {/* Actual textarea */}
                  <textarea
                    ref={textareaRef}
                    className="w-full p-3 font-mono text-sm resize-none bg-transparent relative z-10 focus:outline-none overflow-auto"
                    //value={codeText}
                    onChange={(e) => setCodeText(e.target.value)}
                    onScroll={handleScroll}
                    spellCheck={false}
                    style={{
                      color: 'transparent',
                      caretColor: 'black',
                      lineHeight: '24px',
                      whiteSpace: 'pre',
                      wordWrap: 'normal',
                      WebkitTextFillColor: 'transparent',
                      height: '456px' // 19 lines * 24px line height
                    }}
                    wrap="off"
                  />
                </div>
              </div>
              <div className="border-l border-t border-b border-[#3B4CBF] h-30 w-full">
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <div className="flex items-center gap-3">
                {/* <button
                  onClick={() => {
                    if (onSubmit) onSubmit(answers);
                    else console.log("Saved progress", answers);
                  }}
                  className="px-4 py-2 rounded border bg-white hover:bg-gray-50"
                >
                  Save
                </button> */}

                <Button
                  onClick={() => {
                    if (onSubmit) onSubmit(answers);
                    else console.log("Saved progress", answers);
                    handleSubmit();
                  }}
                  // onClick={handleSubmit}
                  className="px-6 py-2 rounded-xl text-white shadow bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90"
                >
                  Submit
                </Button>
                <Button
                  onClick={handleNextClick}
                  className="px-4 py-2 rounded-xl border border-blue-800 hover:bg-gray-100"
                >
                  <div className="flex items-center text-blue-800 gap-1">
                    Next
                    <img src="/icons/right_arrow_blue.svg" alt="right_arrow" className="w-3 h-3" />
                  </div>
                </Button>
                {/* <Button 
                  className="px-3 py-2 rounded-xl border border-[#18B941] hover:bg-gray-100"
                >
                  <div className="text-[#18B941]">
                    <img src="/icons/tick_badge_green.svg" alt="tick_badge_green" className="w-4 h-4 inline-block mr-2"/>
                    Submitted Successfully
                  </div>
                </Button>
                <Button 
                  className="px-3 py-2 rounded-xl border border-[#D94439] hover:bg-gray-100"
                >
                  <div className="text-[#D94439]">
                    <img src="/icons/close_badge_red.svg" alt="close_badge_red" className="w-4 h-4 inline-block mr-2"/>
                    Failed
                  </div>
                </Button>
                <Button 
                  className="px-3 py-2 rounded-xl border border-[#323130] hover:bg-gray-100"
                >
                  <div className="text-[#323130]">
                    <img src="/icons/question_points_icon_black.svg" alt="question_points_icon_black" className="w-4 h-4 inline-block mr-2"/>
                    Not Attended
                  </div>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}