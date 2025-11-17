import React, { useState } from "react";
import { cn } from "@heroui/theme";
import { useSendEmailForAssessmentMutation } from "@/store/services/ApiRequest";

type SendEmailProps = {
  setShowEmailModal: (value: boolean) => void;
  link: string;
};

const SendEmail: React.FC<SendEmailProps> = ({ setShowEmailModal, link }) => {
  const [email, setEmail] = useState("alexis@amazon.com");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [sendEmail, { isLoading }] = useSendEmailForAssessmentMutation();

  const [message] = useState(
    "To move forward in the process, please complete your assessment within 24 hours. " +
      "Candidates who finish promptly are prioritized for review, giving you the best chance to stay ahead in the process. " +
      "Click the link below to start your assessment:\n\n" +
      "Assessment Link: " +
      `${link}` +
      "\n\nWe're excited to see your results and look forward to the next steps together."
  ); // 'To move forward in the process, please complete your assessment within 24 hours. Candidates who finish promptly are prioritized for review, giving you the best chance to stay ahead in the process.We’re excited to see your results and look forward to the next steps together.'

  const handleSendEmail = async (email: string, link: string) => {
    try {
      const response = await sendEmail({
        to: [
          {
            email,
            identifier: email, // Using email as the identifier
          },
        ],
        subject: "Your Assessment Link",
        body: message,
        link_id: link,
      });
      console.log("Email API Response:", response);
      setShowEmailModal(false);
    } catch (error: any) {
      console.error("Failed to send email:");
      // Show error to user
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-[999]"
        onClick={() => setShowEmailModal(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-2xl w-full max-w-md relative">
          <div className="flex items-center justify-between border-b-2 border-blue-100 p-4 mb-4">
            <h2 className="text-lg font-semibold mb-1">Send Email</h2>
            <div className="flex items-center bg-[#EEF2FF] p-2 rounded-full cursor-pointer">
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowEmailModal(false)}
              >
                <img
                  src="/icons/close_icon_blue.svg"
                  alt="close_icon_blue"
                  className="w-3 h-3"
                />
              </button>
            </div>
          </div>
          <div className="px-9 py-1">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              placeholder=""
              value={message}
              className={cn(
                "w-full h-30 2xl:h-35 flex-1 border border-gray-300 rounded-xl p-3 mb-6",
                "text-[#323130] text-sm font-medium outline-none"
              )}
            />
            <div className="mb-6 px-5">
              <label className="block text-sm font-medium mb-2">
                Enter the email
              </label>
              <div className="flex items-center gap-2 mb-4">
                <span className="absolute flex items-center p-2">
                  <img src="/icons/mail.svg" alt="mail" className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl py-2 px-7 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  className="w-full border rounded-l-xl p-2 text-sm border-gray-300"
                  value={link}
                  readOnly
                />
                <button
                  className="flex items-center p-2.5 w-20 border-t border-r border-b border-gray-300 rounded-r-xl gap-1 bg-gray-50 text-black text-xs cursor-pointer"
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? "Copied!" : "Copy"}
                  <img
                    src="/icons/copy_gray.svg"
                    alt="copy_gray"
                    className="w-3 h-3"
                  />
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-35 p-2 flex items-center justify-center gap-3 rounded-xl bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] text-white cursor-pointer disabled:opacity-50"
                  onClick={() => handleSendEmail(email, link)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                  ) : (
                    <img
                      src="icons/mail_white.svg"
                      alt="mail_white"
                      className="w-4 h-4"
                    />
                  )}
                  {isLoading ? "Sending..." : "Send email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
