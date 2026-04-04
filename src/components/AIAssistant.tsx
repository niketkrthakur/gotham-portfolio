import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { askAI } from "@/lib/ai";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);

  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/batman-click.mp3");
  }, []);

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {});
    }
  };
const [input, setInput] = useState("");
const [messages, setMessages] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = input;
  setInput("");

  setMessages((prev) => [...prev, "You: " + userMsg]);
  setLoading(true);

  try {
    const response = await askAI(userMsg);
    setMessages((prev) => [...prev, "AI: " + response]);
  } catch (err) {
    setMessages((prev) => [...prev, "AI: Error connecting..."]);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* 🦇 Floating Button */}
      <motion.button
        onClick={() => {
          playClick();
          setOpen(!open);
        }}
        className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 rounded-full border border-primary bg-background shadow-lg hover:box-glow transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: "none" }}
        data-clickable
      >
        {open ? <X /> : <MessageCircle />}
      </motion.button>

      {/* 🧠 AI PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-[999] w-[320px] bg-card border border-primary p-4 shadow-xl backdrop-blur-md"
            >
            <p className="font-mono text-xs text-primary mb-2 tracking-widest">
                BAT AI
            </p>

            {/* 🧠 Chat Messages */}
            <div className="h-40 overflow-y-auto text-xs mb-3 space-y-2 pr-1">
                {messages.map((msg, i) => (
                    <div
                    key={i}
                    className={`px-2 py-1 rounded ${
                        msg.startsWith("You")
                        ? "bg-primary/10 text-right"
                        : "bg-secondary/50"
                    }`}
                    >
                    {msg}
                    </div>
                ))}

                {loading && (
                    <div className="text-xs text-primary animate-pulse">
                    AI is thinking...
                    </div>
                )}
                </div>

            {/* 🧾 Input + Button */}
            <div className="flex gap-2">
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Niket..."
                className="flex-1 px-3 py-2 bg-secondary border border-border text-sm outline-none focus:border-primary"
                />

                <button
                onClick={handleSend}
                className="px-3 border border-primary text-primary hover:bg-primary/20 transition"
                >
                ➤
                </button>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;