export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-10 text-gray-400"
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-red-500"
      />
      <span>{message}</span>
    </div>
  );
}
