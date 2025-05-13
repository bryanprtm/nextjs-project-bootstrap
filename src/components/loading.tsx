export function Loading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function TableRowsLoading() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </td>
        </tr>
      ))}
    </>
  );
}
