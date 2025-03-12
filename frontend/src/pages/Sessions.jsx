import React, { useEffect } from "react";
import { LogIn, LogOut, Monitor, Smartphone, Globe, Clock } from "lucide-react";
import sessionsStore from "../store/SessionsStore";

const Sessions = () => {
  const { sessionHistory, getSessions, loading } = sessionsStore();
  useEffect(() => {
    getSessions();
  }, []);
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "login":
        return <LogIn className="w-5 h-5 text-green-500" />;
      case "logout":
        return <LogOut className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getDeviceIcon = (userAgent) => {
    if (userAgent.includes("Mobile")) {
      return <Smartphone className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  if (loading) return <SessionsSkeleton />;

  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
          Login History
        </h2>

        <div className="space-y-4">
          {sessionHistory.map((session) => (
            <div
              key={session._id}
              className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
            >
              <div className="flex items-center gap-4">
                {/* Action Icon */}
                <div className="p-2 bg-level-2 rounded-lg border-2 border-dashed border-level-4">
                  {getActionIcon(session.action)}
                </div>

                {/* Session Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-level-5 capitalize">
                      {session.action}
                    </span>
                    <span className="text-level-5/50">•</span>
                    <div className="flex items-center gap-1 text-level-5/70">
                      <Clock className="w-4 h-4" />
                      {formatDate(session.timestamp)}
                    </div>
                  </div>

                  {/* Device & Location Info */}
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-4 text-level-5/70">
                      <div className="flex items-center gap-1">
                        {getDeviceIcon(session.userAgent)}
                        <span>{session.device || "Desktop"}</span>
                      </div>
                      <span className="text-level-5/30">|</span>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{session.ip}</span>
                      </div>
                    </div>
                    <div className="text-sm text-level-5/60">
                      {session.userAgent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sessionHistory.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-level-5 mb-2">
              No Login History
            </h3>
            <p className="text-level-5/70">
              Your login history will appear here once you start using your
              account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SessionsSkeleton = () => {
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-level-3/50 animate-pulse rounded-lg ml-7 relative before:content-[''] before:w-5 before:h-full before:bg-level-3/50 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 mb-8"></div>

        {/* Sessions List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
            >
              <div className="flex items-center justify-between">
                {/* Device Info Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-level-3/50 animate-pulse rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-level-3/50 animate-pulse rounded-lg"></div>
                    <div className="h-4 w-48 bg-level-3/50 animate-pulse rounded-lg"></div>
                  </div>
                </div>

                {/* Status & Actions Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-8 w-24 bg-level-3/50 animate-pulse rounded-full"></div>
                  <div className="h-10 w-10 bg-level-3/50 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
