'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownEditor } from './Editor';
import { FileManager } from './FileManager';
import { 
  MarkdownFile, 
  createNewFile, 
  saveFile, 
  getLastSessionFileId, 
  saveLastSession,
  getFileById
} from '@/lib/storage';

interface NotificationProps {
  type: 'success' | 'error' | 'info';
  message: string;
  id: string;
}

export function MarkdownWorkspace() {
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    const lastFileId = getLastSessionFileId();
    if (lastFileId) {
      const file = getFileById(lastFileId);
      if (file) {
        setCurrentFile(file);
        addNotification('info', `Archivo cargado: ${file.name}`);
      }
    }
  }, []);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `notification-${Date.now()}`;
    setNotifications(prev => [...prev, { type, message, id }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 3000);
  };

  const handleNewFile = () => {
    const newFile = createNewFile();
    setCurrentFile(newFile);
    saveLastSession(newFile.id);
    
    setRefreshTrigger(prev => prev + 1);
    addNotification('success', 'Nuevo archivo creado');
  };
  const handleFileSelect = (file: MarkdownFile) => {
    setCurrentFile(file);
    saveLastSession(file.id);
  };

  const handleSaveFile = (content: string, fileName: string) => {
    if (currentFile) {
      const updatedFile = {
        ...currentFile,
        name: fileName,
        content,
      };
      
      saveFile(updatedFile);
      setCurrentFile(updatedFile);
      saveLastSession(updatedFile.id);
      
      setRefreshTrigger(prev => prev + 1);
      addNotification('success', `Archivo "${fileName}" guardado correctamente`);
    } else if (content.trim()) {
      const newFile = createNewFile(fileName, content);
      setCurrentFile(newFile);
      saveLastSession(newFile.id);
      
      setRefreshTrigger(prev => prev + 1);
      addNotification('success', `Archivo "${fileName}" creado correctamente`);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Sistema de notificaciones */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`mb-2 p-3 rounded-lg shadow-lg flex items-center ${
                notification.type === 'success' ? 'bg-green-500 text-white' :
                notification.type === 'error' ? 'bg-destructive text-destructive-foreground' :
                'bg-secondary text-secondary-foreground'
              }`}
            >
              {notification.type === 'success' && (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              )}
              {notification.type === 'error' && (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
              {notification.type === 'info' && (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              )}
              <span>{notification.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 flex-1">
        <motion.div 
          className="w-1/4 h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FileManager
            onFileSelect={handleFileSelect}
            onNewFile={handleNewFile}
            currentFile={currentFile}
            refreshTrigger={refreshTrigger}
          />
        </motion.div>
        <motion.div 
          className="w-3/4 h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {currentFile ? (
            <MarkdownEditor
              initialValue={currentFile.content}
              fileName={currentFile.name}
              onSave={handleSaveFile}
            />
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-full border border-border rounded-lg bg-background text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mb-4 opacity-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring", 
                  stiffness: 200 
                }}
                whileHover={{ rotate: 10 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polygon points="10 9 9 9 8 9"></polygon>
              </motion.svg>
              <motion.h3 
                className="text-lg font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                No hay archivo seleccionado
              </motion.h3>
              <motion.p 
                className="text-center max-w-md mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Selecciona un archivo existente o crea uno nuevo para comenzar a editar.
              </motion.p>
              <motion.button 
                onClick={handleNewFile}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Crear nuevo archivo
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}