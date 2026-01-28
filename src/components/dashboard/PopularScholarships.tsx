type Scholarship = {
  id: number;
  name: string;
  students: number;
};

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "Desenvolvimento Web Fullstack",
    students: 12,
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    students: 8,
  },
  {
    id: 3,
    name: "UX/UI Design Masterclass",
    students: 5,
  },
];

export function PopularScholarships() {
  const maxStudents = Math.max(...scholarships.map(s => s.students));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Bolsas Populares
      </h2>

      <ul className="space-y-4">
        {scholarships.map((scholarship) => {
          const percentage =
            (scholarship.students / maxStudents) * 100;

          return (
            <li key={scholarship.id}>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{scholarship.name}</span>
                <span>{scholarship.students}</span>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
