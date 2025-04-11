/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { editor } from 'monaco-editor';
import { getEditorSettings, saveEditorSettings } from '@/lib/storage';
import { MarkdownSnippets } from './MarkdownSnippets';
import MermaidClient from './MermaidClient';
 
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);
 
const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  if (node)
  if (language === 'mermaid') { 
    return <MermaidClient chart={code} />;
  }
  
  return !inline && match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      PreTag="div"
      {...props}
    >
      {code}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

interface EditorProps {
  initialValue?: string;
  onSave?: (content: string, fileName: string) => void;
  fileName?: string;
}

export function MarkdownEditor({ initialValue = '', onSave, fileName: initialFileName = 'untitled.md' }: EditorProps) {
  const [markdown, setMarkdown] = useState<string>(initialValue);
  const [fileName, setFileName] = useState<string>(initialFileName);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');
  const [settings, setSettings] = useState(() => getEditorSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
   
  useEffect(() => {
    if (initialValue !== markdown) {
      setMarkdown(initialValue);
    }
    if (initialFileName !== fileName) {
      setFileName(initialFileName);
    }
  }, [initialValue, initialFileName]);
 
  useEffect(() => {
    const userSettings = getEditorSettings();
    setSettings(userSettings);
    setViewMode(userSettings.defaultViewMode);
  }, []);
 
  const updateSettings = (newSettings: Partial<typeof settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveEditorSettings(updatedSettings);
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;
     
    editor.updateOptions({
      fontSize: settings.fontSize,
      lineNumbers: settings.lineNumbers ? 'on' : 'off',
      wordWrap: settings.wordWrap ? 'on' : 'off'
    });
 
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });
  };

  const handleEditorChange = (value: string = '') => {
    setMarkdown(value); 
    if (saveStatus === 'saved') {
      setSaveStatus('idle');
    }
  };

  const handleSave = () => {
    if (!onSave || !markdown) return;

    setIsSaving(true);
    setSaveStatus('saving');

    try { 
      setTimeout(() => {
        onSave(markdown, fileName);
        setIsSaving(false);
        setSaveStatus('saved');
 
        setTimeout(() => {
          if (saveStatus === 'saved') {
            setSaveStatus('idle');
          }
        }, 2000);
      }, 300);
    } catch (error) {
      console.error('Error al guardar:', error);
      setIsSaving(false);
      setSaveStatus('error');
       
      setTimeout(() => {
        if (saveStatus === 'error') {
          setSaveStatus('idle');
        }
      }, 3000);
    }
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value); 
    setSaveStatus('idle');
  };

  const changeViewMode = (mode: 'edit' | 'preview' | 'split') => {
    setViewMode(mode);
    updateSettings({ defaultViewMode: mode });
  };

  const handleFontSizeChange = (increase: boolean) => {
    const newSize = increase ? settings.fontSize + 1 : Math.max(10, settings.fontSize - 1);
    updateSettings({ fontSize: newSize });
    
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize: newSize });
    }
  };

  const toggleLineNumbers = () => {
    const newValue = !settings.lineNumbers;
    updateSettings({ lineNumbers: newValue });
    
    if (editorRef.current) {
      editorRef.current.updateOptions({ lineNumbers: newValue ? 'on' : 'off' });
    }
  };
  
  const toggleWordWrap = () => {
    const newValue = !settings.wordWrap;
    updateSettings({ wordWrap: newValue });
    
    if (editorRef.current) {
      editorRef.current.updateOptions({ wordWrap: newValue ? 'on' : 'off' });
    }
  };

  const handleInsertSnippet = (code: string) => {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      if (!selection) {
        return;
      }
      const id = { major: 1, minor: 1 };             
      const op = { identifier: id, range: selection, text: code, forceMoveMarkers: true };
      editorRef.current.executeEdits("snippet-insert", [op]);
      editorRef.current.focus();
      setSnippetsOpen(false);
    } else {
      setMarkdown((prev) => prev + '\n\n' + code);
    }
  };

  return (
    <motion.div 
      className="flex flex-col w-full h-full border border-border rounded-lg overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex items-center justify-between p-2 border-b border-border bg-card"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            className="px-2 py-1 text-sm rounded border border-input bg-background"
            placeholder="Nombre del archivo..."
          />
          <motion.button 
            onClick={handleSave}
            className={`px-3 py-1 text-sm rounded ${
              saveStatus === 'saving' ? 'bg-secondary text-secondary-foreground' :
              saveStatus === 'saved' ? 'bg-green-500 text-white' :
              saveStatus === 'error' ? 'bg-destructive text-destructive-foreground' :
              'bg-primary text-primary-foreground'
            } hover:opacity-90 flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSaving}
          >
            {saveStatus === 'saving' && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {saveStatus === 'saved' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            )}
            {saveStatus === 'error' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
            {saveStatus === 'saving' ? 'Guardando...' : 
             saveStatus === 'saved' ? 'Guardado' : 
             saveStatus === 'error' ? 'Error' : 'Guardar'}
          </motion.button>
          
          <motion.div 
            className="pl-2 flex items-center gap-1 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              title="Disminuir tamaño de fuente" 
              onClick={() => handleFontSizeChange(false)}
              className="p-1 hover:bg-secondary/50 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </motion.button>
            <span className="text-xs">{settings.fontSize}px</span>
            <motion.button 
              title="Aumentar tamaño de fuente" 
              onClick={() => handleFontSizeChange(true)}
              className="p-1 hover:bg-secondary/50 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </motion.button>
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setSnippetsOpen(true)}
            title="Insertar componentes predefinidos"
            className="p-1.5 rounded-md text-xs hover:bg-secondary/50 flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Componentes</span>
          </motion.button>
          
          <motion.button
            onClick={toggleLineNumbers}
            title={settings.lineNumbers ? "Ocultar números de línea" : "Mostrar números de línea"}
            className={`p-1.5 rounded text-xs ${settings.lineNumbers ? 'bg-secondary/50' : 'text-muted-foreground'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            123
          </motion.button>
          <motion.button
            onClick={toggleWordWrap}
            title={settings.wordWrap ? "Desactivar ajuste de texto" : "Activar ajuste de texto"}
            className={`p-1.5 rounded text-xs ${settings.wordWrap ? 'bg-secondary/50' : 'text-muted-foreground'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Wrap
          </motion.button>
          
          <motion.div 
            className="flex items-center rounded border border-border"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={() => changeViewMode('edit')}
              className={`px-3 py-1 text-sm ${viewMode === 'edit' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'}`}
              whileHover={viewMode !== 'edit' ? { backgroundColor: 'rgba(0,0,0,0.05)' } : {}}
            >
              Editor
            </motion.button>
            <motion.button 
              onClick={() => changeViewMode('split')}
              className={`px-3 py-1 text-sm ${viewMode === 'split' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'}`}
              whileHover={viewMode !== 'split' ? { backgroundColor: 'rgba(0,0,0,0.05)' } : {}}
            >
              Split
            </motion.button>
            <motion.button 
              onClick={() => changeViewMode('preview')}
              className={`px-3 py-1 text-sm ${viewMode === 'preview' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'}`}
              whileHover={viewMode !== 'preview' ? { backgroundColor: 'rgba(0,0,0,0.05)' } : {}}
            >
              Vista previa
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <div className={`flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} flex-1`}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <motion.div 
            className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full border-r border-border`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MonacoEditor
              height="100%"
              language="markdown"
              theme="vs-dark"
              value={markdown}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                wordWrap: settings.wordWrap ? 'on' : 'off',
                lineNumbers: settings.lineNumbers ? 'on' : 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: 'var(--font-geist-mono)',
                fontSize: settings.fontSize,
              }}
            />
          </motion.div>
        )}
        
        {(viewMode === 'preview' || viewMode === 'split') && (
          <motion.div 
            className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full overflow-auto p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[
                  rehypeRaw, 
                  rehypeSanitize
                ]}
                components={{
                  code: CodeBlock
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>

      {/* Panel de fragmentos Markdown */}
      <MarkdownSnippets 
        onInsertSnippet={handleInsertSnippet} 
        isOpen={snippetsOpen} 
        onClose={() => setSnippetsOpen(false)} 
      />
    </motion.div>
  );
}