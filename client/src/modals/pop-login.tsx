import { Button } from "../components/ui/button";
import useModalContext from "../hooks/useModalContext";
import { ModalType } from "../types/modal.types";

const PopLogin = ({ data }: ModalType<"POP_LOGIN">) => {
  const { closeModal } = useModalContext();
  return (
    <>
      <div className="sm:max-w-md">
        <div>
          <p className="font-medium text-lg">Login Required</p>
          <p>
            You need to be logged in to access{" "}
            {data?.featureName || "this feature"}.
          </p>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="rounded-full bg-slate-100 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => closeModal("POP_LOGIN")}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default PopLogin;
