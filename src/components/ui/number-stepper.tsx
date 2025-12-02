
"use client";

import { Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NumberStepperProps {
  value: string;
  onValueChange: (value: string) => void;
  onGoClick: (e: React.FormEvent) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberStepper({ value, onValueChange, onGoClick, min = 1, max, step = 1 }: NumberStepperProps) {
  
  const updateValue = (amount: number) => {
    const current = parseInt(value, 10) || 0;
    let newValue = current + amount;
    
    if (min !== undefined) {
      newValue = Math.max(min, newValue);
    }
    if (max !== undefined) {
        newValue = Math.min(max, newValue);
    }
    onValueChange(newValue.toString());
  };

  return (
    <motion.div layout className="flex-grow flex items-center justify-center h-14 w-full">
        <div className="flex items-center justify-center h-full rounded-lg bg-slate-100 border p-1 group focus-within:bg-white focus-within:shadow-md focus-within:border-primary/50 transition-all duration-300 w-full">
            <Button type="button" variant="ghost" size="icon" className="h-full w-12 text-muted-foreground hover:bg-slate-200 rounded-md" onClick={() => updateValue(-step)}>
                <Minus className="h-5 w-5"/>
            </Button>
            <div className="relative flex-grow flex items-center justify-center">
                <Input 
                    type="number"
                    placeholder="e.g. 15"
                    className="w-full text-center text-xl font-semibold bg-transparent border-0 shadow-none focus-visible:ring-0 p-0"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    min={min}
                    max={max}
                />
            </div>
            <Button type="button" variant="ghost" size="icon" className="h-full w-12 text-muted-foreground hover:bg-slate-200 rounded-md" onClick={() => updateValue(step)}>
                <Plus className="h-5 w-5"/>
            </Button>
            <motion.div whileTap={{ scale: 0.95 }} className="flex ml-1">
                <Button type="submit" size="icon" className="h-12 w-12 bg-slate-800 text-white hover:bg-slate-700 shadow-md" onClick={onGoClick}>
                    <span className="sr-only">Go</span>
                    <ArrowRight className="h-6 w-6"/>
                </Button>
            </motion.div>
      </div>
    </motion.div>
  );
}
