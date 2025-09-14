import React, { useEffect, useRef } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

export const ChatSidebar = () => {
  const { prevPrompts = [], setRecentPrompt, newChat } = useChatContext();
  const sidebarRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!vantaRef.current && sidebarRef.current) {
      vantaRef.current = WAVES({
        el: sidebarRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xA0E0FF, // Changed to a lighter blue color
        shininess: 60,
        waveHeight: 20,
        waveSpeed: 1.0,
        zoom: 0.9,
      });
    }
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  const loadPrompt = async (prompt) => {
    if (setRecentPrompt) setRecentPrompt(prompt);
  };

  return (
    <div
      ref={sidebarRef}
      className="min-h-screen w-80 flex flex-col relative text-white"
      style={{ background: "transparent" }}
    >
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/20 flex items-center gap-3">
        <motion.div
          className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold">Floatchat</h1>
          <p className="text-xs mt-0.5">ARGO Data Analysis Tool</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-4 overflow-y-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button
            onClick={newChat}
            variant="outline"
            className="w-full justify-start gap-2 mb-6 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border-dashed border-white/30"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </motion.div>

        <div className="space-y-3">
          {prevPrompts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Recent</h3>
              <div className="space-y-1">
                {prevPrompts.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200 group flex items-start gap-3 shadow-sm hover:shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MessageSquare className="h-4 w-4 text-white/50 mt-0.5 group-hover:text-white transition-colors" />
                    <p className="text-sm text-white truncate leading-relaxed">
                      {item.slice(0, 50)}
                      {item.length > 50 ? "..." : ""}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 relative z-10">
        <div className="text-xs text-white/70 text-center">Powered by Framer Motion & Shadcn UI</div>
      </div>
    </div>
  );
};