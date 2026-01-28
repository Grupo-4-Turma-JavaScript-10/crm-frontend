import { StatCard } from "../../components/dashboard/StatCard";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { PopularScholarships } from "../../components/dashboard/PopularScholarships";

import {
  Users,
  GraduationCap,
  Link,
  UserX,
} from "lucide-react";

export function Home() {
  return (
    <main className="p-6 bg-gray-50 min-h-screen space-y-8">

      <section>
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard Geral
        </h1>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Estudantes"
          value={154}
          subtitle="+12% desde o mês passado"
          icon={<Users size={20} />}
          iconBg="bg-blue-500"
        />

        <StatCard
          title="Bolsas Ativas"
          value={8}
          subtitle="De um total de 12"
          icon={<GraduationCap size={20} />}
          iconBg="bg-green-500"
        />

        <StatCard
          title="Alunos com Bolsa"
          value={45}
          subtitle="29% da base de alunos"
          icon={<Link size={20} />}
          iconBg="bg-purple-500"
        />

        <StatCard
          title="Inativos"
          value={109}
          subtitle="Sem vínculo ativo"
          icon={<UserX size={20} />}
          iconBg="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <PopularScholarships />
      </div>

    </main>
  );
}
