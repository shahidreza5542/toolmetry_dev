'use client';

import { useState } from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { DocsSidebar } from '@/app/components/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex-1 flex min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[260px] shrink-0 border-r border-[#1A1A1A] sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <DocsSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            {/* Drawer */}
            <div className="relative w-[280px] max-w-[80vw] bg-[#0A0A0A] h-full border-r border-[#1A1A1A]">
              <DocsSidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile sidebar toggle */}
          <div className="md:hidden border-b border-[#1A1A1A] px-5 py-2 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-medium text-[#999] hover:text-white transition-colors"
              aria-label="Open sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              Menu
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-5 md:px-8 py-8">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
