type Activity = {
  id: number;
  description: string;
  time: string;
};

const activities: Activity[] = [
  {
    id: 1,
    description: "Novo aluno cadastrado",
    time: "Há 2 horas",
  },
  {
    id: 2,
    description: "Bolsa atribuída a um aluno",
    time: "Há 4 horas",
  },
  {
    id: 3,
    description: "Aluno desativado",
    time: "Ontem",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Atividade Recente
      </h2>

      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-gray-700">
              {activity.description}
            </span>
            <span className="text-xs text-gray-400">
              {activity.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
