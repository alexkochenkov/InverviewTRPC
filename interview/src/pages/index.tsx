import { api } from "interview/utils/api";

// This is the main entry page for the app

// Object definition for the data that is fetched by the API
interface Carrier {
  name: string;
  usDotNumber: string;
  docketNumbers: string;
  dotStatus: string;
  authorityStatus: string;
  carrierType: string;
}



export default function Home() {
  const { data, isLoading, error } = api.post.fetchData.useQuery({
    dotNumbers: [
      3662747, 2232830, 4038903, 4275010, 1321219, 2872963, 4270867, 2076262,
      559727, 3857959, 2210698, 2919760, 2413875, 50805, 3152856, 2108957,
      4292167, 2146209, 2064610, 3424162,
    ],
  });

  // Waits for the page to Load
  if (isLoading) return <p>Loading...</p>;
  // Error message in case it does not work
  if (error) return <p>Error: {error.message}</p>;

  return (
  <div>
    <div className="mt-10 flex items-center justify-center">
          
          <img
            src="/bell-icon.png"
            alt="Bell Icon"
            className="w-12 h-12"
          />
          <img
            src="/whistle-icon.png"
            alt="Whistle Icon"
            className="w-12 h-12"
          />
        </div>

    <div className="mt-20 ml-40 mr-40 flex flex-col border border-gray-300 rounded-lg shadow-md">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                    <tr>
                      {["Name", "usDotNumber", "docketNumbers", "dotStatus", "authorityStatus", "carrierType"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-start text-xs font-large text-gray-500 uppercase dark:text-neutral-500"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data.map((carrier: Carrier, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-neutral-500">{carrier.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-500">{carrier.usDotNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-500">{carrier.docketNumbers}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-500">{carrier.dotStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-500">{carrier.authorityStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-500">{carrier.carrierType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}
