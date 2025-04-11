'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
 
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'sans-serif',
  logLevel: 3,  
  flowchart: { curve: 'basis' },
});

interface MermaidClientProps {
  chart: string;
}

export default function MermaidClient({ chart }: MermaidClientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderAttempts, setRenderAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

  useEffect(() => {
    if (!ref.current || !chart.trim()) return;
     
    ref.current.innerHTML = '';
    setError(null);

    const renderDiagram = async () => {
      try { 
        if (document.readyState !== 'complete') {
          await new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          });
        }

        const { svg } = await mermaid.render(id, chart);
        
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error al renderizar el diagrama Mermaid:', error);
         
        if (renderAttempts < 3) {
          setRenderAttempts(prev => prev + 1);
          setTimeout(() => renderDiagram(), 100 * (renderAttempts + 1));
          return;
        }
        
        setError(error instanceof Error ? error.message : 'Error desconocido');
        
        if (ref.current) {
          ref.current.innerHTML = `
            <pre class="text-red-500 p-2 border border-red-300 rounded text-xs whitespace-pre-wrap">
              ${chart}
            </pre>
            <div class="text-red-500 p-2 border border-red-300 rounded mt-2">
              Error al renderizar el diagrama Mermaid: ${error instanceof Error ? error.message : 'Error desconocido'}
            </div>
          `;
        }
      }
    };
 
    const timer = setTimeout(() => {
      renderDiagram();
    }, 10);

    return () => clearTimeout(timer);
  }, [chart, id, renderAttempts]);

  if (error) {
    return (
      <div className="mermaid-diagram my-4 bg-neutral-900 p-4 rounded-md overflow-auto">
        <div className="text-red-500 mb-2">Error al renderizar el diagrama:</div>
        <pre className="text-xs whitespace-pre-wrap border-l-2 border-red-500 pl-2">{chart}</pre>
        <button 
          onClick={() => setRenderAttempts(prev => prev + 1)}
          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="mermaid-diagram my-4 bg-neutral-900 p-4 rounded-md overflow-auto">
      <div ref={ref} />
    </div>
  );
}