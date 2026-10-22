export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg bg-white/10 px-4 py-3 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
      >
        Previous
      </button>

      <span className="text-sm text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-white/10 px-4 py-3 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
      >
        Next
      </button>
    </div>
  );
}
