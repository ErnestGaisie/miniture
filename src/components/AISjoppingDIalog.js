"use client";
import { Dialog, DialogContent, DialogTitle, CardHeader } from "@mui/material";
import { X, BrainCircuit } from "lucide-react";
import React from "react";

export function AIShoppingDialog({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[900px] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <CardHeader>
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <BrainCircuit className="text-indigo-400" />
            <span>AI Furniture Finder</span>
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Close</span>
          </button>
        </CardHeader>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.example.com"
            title="AI Furniture Shopping Assistant"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Our AI will analyze your preferences and suggest the perfect furniture
          for your space.
        </p>
      </DialogContent>
    </Dialog>
  );
}
