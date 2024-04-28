interface exitButtonProps {
  onClick: () => void;
}
function ExitButton(props: exitButtonProps) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  );
}

export default ExitButton;
