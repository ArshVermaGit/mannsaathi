"use client";

import Image from "next/image";
import { Activity, Calendar, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface DashboardClientProps {
  session: any;
  logs: any[];
}

export function DashboardClient({ session, logs }: DashboardClientProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-surface-800 border border-surface-700 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-6">
          {session.user.image && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500">
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={96} 
                height={96} 
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">
              {t("dashboard.welcome").replace("{name}", session.user.name?.split(" ")[0] || "")}
            </h1>
            <p className="text-text-secondary text-lg">
              {t("dashboard.subtitle")}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-surface-800 border border-surface-700 rounded-3xl p-8 mb-8">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <Activity className="text-primary-500" /> {t("dashboard.history")}
        </h2>
        
        {logs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-surface-700 rounded-2xl">
            <p className="text-text-secondary mb-4">{t("dashboard.noChecks")}</p>
            <a href="/check" className="text-primary-500 hover:text-primary-400 font-medium">{t("dashboard.startCheck")}</a>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map(log => {
              const riskLevelStr = log.riskLevel === "WORTH_ATTENTION" 
                ? t("result.worthAttention")
                : log.riskLevel === "MODERATE"
                  ? t("result.moderate")
                  : t("result.lowRisk");

              return (
                <div key={log.id} className="p-4 border border-surface-700 rounded-xl hover:border-surface-600 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-text-tertiary mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary capitalize">
                        {log.symptomIds.join(", ").replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {new Date(log.createdAt).toLocaleDateString()} • {t("dashboard.duration")}: {log.durationDays} {t("dashboard.days")}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap text-center ${
                    log.riskLevel === "WORTH_ATTENTION" 
                      ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                      : log.riskLevel === "MODERATE"
                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        : "bg-green-500/10 text-green-500 border border-green-500/20"
                  }`}>
                    {log.riskLevel === "WORTH_ATTENTION" && <ShieldAlert className="w-4 h-4 inline mr-1" />}
                    {riskLevelStr}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
