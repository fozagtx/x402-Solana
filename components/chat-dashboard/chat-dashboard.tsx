"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { WelcomeSection } from "./welcome-section";
import { FeatureCards } from "./feature-cards";
import { ActionButtons } from "./action-buttons";
import { ChatInput } from "./chat-input";
import { Leva } from "leva";
import { ChatTranscript } from "./chat-transcript";
import { useAdkChat } from "@/hooks/useAdkChat";
import { AlertCircle } from "lucide-react";

export function ChatDashboard() {
  const [hovering] = useState(false);
  const {
    messages,
    sendMessage,
    isProcessing,
    isReady,
    error,
    clearError,
    updatePaymentStatus,
    handlePaymentError,
    handlePaymentSuccess,
  } = useAdkChat();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <Header />
        
        <div className="container pt-20 sm:pt-24 md:pt-32 pb-32 md:pb-48 space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8">
          <WelcomeSection />
          <FeatureCards />
          <ActionButtons />
          <div>
            <h2 className="text-black font-serif text-lg sm:text-xl mb-3">Live Agent Console</h2>
            <ChatTranscript
              messages={messages}
              isProcessing={isProcessing}
              onStatusChange={updatePaymentStatus}
              onPaymentError={handlePaymentError}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20">
          {error && (
            <div className="container mb-2">
              <div className="max-w-4xl mx-auto rounded-2xl border-2 border-red-200 bg-red-50 text-red-800 text-xs sm:text-sm flex items-center gap-2 px-3 sm:px-4 py-2 shadow-lg shadow-red-200/50">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  className="text-red-600 underline decoration-dotted hover:text-red-800 transition-colors"
                  onClick={clearError}
                >
                  dismiss
                </button>
              </div>
            </div>
          )}
          <ChatInput onSend={sendMessage} disabled={!isReady || isProcessing} />
        </div>
      </div>
      <Leva hidden />
    </div>
  );
}

