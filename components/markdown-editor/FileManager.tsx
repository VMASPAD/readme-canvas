'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MarkdownFile, 
  getAllFiles, 
  deleteFile, 
  searchFiles, 
  toggleFileFavorite 
} from '@/lib/storage';

interface FileManagerProps {
  onFileSelect: (file: MarkdownFile) => void;
  onNewFile: () => void;
  currentFile?: MarkdownFile | null;
  refreshTrigger?: number;  
}

export function FileManager({ onFileSelect, onNewFile, currentFile, refreshTrigger = 0 }: FileManagerProps) {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all');
  const [isCreating, setIsCreating] = useState(false);
 
  useEffect(() => {
    loadFiles();
  }, [refreshTrigger]);
   
  useEffect(() => {
    loadFiles();
  }, []);
 
  const loadFiles = () => {
    if (searchQuery.trim()) {
      const foundFiles = searchFiles(searchQuery);
      setFiles(foundFiles);
    } else {
      const allFiles = getAllFiles();
      setFiles(filterMode === 'favorites' 
        ? allFiles.filter(file => file.isFavorite) 
        : allFiles);
    }
  };
 
  useEffect(() => {
    loadFiles();
  }, [searchQuery, filterMode]);

  const handleDeleteFile = (id: string) => {
    deleteFile(id);
    loadFiles();
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFileFavorite(id);
    loadFiles();
  };
  
  const handleNewFileClick = () => {
    setIsCreating(true);
    onNewFile();
     
    setTimeout(() => {
      loadFiles();
      setIsCreating(false);
    }, 500);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
 
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full border border-border rounded-lg bg-background"
    >
      <div className="p-3 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Archivos Markdown</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar archivos..."
              className="w-full pl-8 pr-2 py-1 text-sm rounded border border-input bg-background"
            />
            <svg 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <motion.button 
            onClick={handleNewFileClick}
            className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isCreating}
          >
            {isCreating ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            )}
            {isCreating ? 'Creando...' : 'Nuevo'}
          </motion.button>
        </div>
        
        <motion.div 
          className="flex mt-2 border border-border rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            onClick={() => setFilterMode('all')} 
            className={`flex-1 py-1 text-xs ${filterMode === 'all' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/20'}`}
            whileHover={{ backgroundColor: filterMode !== 'all' ? 'rgba(0,0,0,0.05)' : '' }}
          >
            Todos
          </motion.button>
          <motion.button 
            onClick={() => setFilterMode('favorites')} 
            className={`flex-1 py-1 text-xs ${filterMode === 'favorites' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/20'}`}
            whileHover={{ backgroundColor: filterMode !== 'favorites' ? 'rgba(0,0,0,0.05)' : '' }}
          >
            Favoritos
          </motion.button>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <motion.div 
            className="h-full flex flex-col items-center justify-center text-muted-foreground p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/file.svg" width={48} height={48} alt="No hay archivos" className="mb-2 opacity-50" />
            {searchQuery ? 'No se encontraron archivos' : filterMode === 'favorites' ? 'No hay archivos favoritos' : 'No hay archivos guardados'}
            <motion.button 
              onClick={handleNewFileClick}
              className="mt-2 text-sm text-primary underline hover:opacity-80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Crear un nuevo archivo
            </motion.button>
          </motion.div>
        ) : (
          <motion.ul 
            className="divide-y divide-border"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {files.map((file) => (
                <motion.li 
                  key={file.id} 
                  className={`flex items-center justify-between p-3 hover:bg-secondary/30 cursor-pointer ${currentFile?.id === file.id ? 'bg-secondary/50' : ''}`}
                  onClick={() => onFileSelect(file)}
                  variants={itemVariants}
                  exit={{ opacity: 0, x: -50 }}
                  layout
                  layoutId={file.id}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-2 flex items-center justify-center text-muted-foreground">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(file.lastModified)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <motion.button
                      onClick={(e) => handleToggleFavorite(file.id, e)}
                      className={`p-1 ${file.isFavorite ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                      title={file.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={file.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </motion.button>
                    <motion.button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="p-1 text-muted-foreground hover:text-destructive"
                      title="Eliminar archivo"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
}