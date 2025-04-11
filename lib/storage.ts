export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  lastModified: number;
  tags?: string[];
  folder?: string;
  isFavorite?: boolean;
}

const STORAGE_KEY = 'markdown-files';
const SETTINGS_KEY = 'markdown-editor-settings';

// Tipos para las configuraciones del editor
export interface EditorSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  lastOpenedFileId?: string;
  defaultViewMode: 'edit' | 'preview' | 'split';
}

// Configuración predeterminada
const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'system',
  fontSize: 14,
  lineNumbers: true,
  wordWrap: true,
  defaultViewMode: 'split',
};

/**
 * Obtiene todos los archivos almacenados
 */
export const getAllFiles = (): MarkdownFile[] => {
  try {
    const files = localStorage.getItem(STORAGE_KEY);
    return files ? JSON.parse(files) : [];
  } catch (error) {
    console.error('Error al leer archivos de localStorage:', error);
    return [];
  }
};

/**
 * Guarda todos los archivos en localStorage
 */
export const saveAllFiles = (files: MarkdownFile[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  } catch (error) {
    console.error('Error al guardar archivos en localStorage:', error);
  }
};

/**
 * Obtiene un archivo por su ID
 */
export const getFileById = (id: string): MarkdownFile | undefined => {
  const files = getAllFiles();
  return files.find(file => file.id === id);
};

/**
 * Guarda un archivo individual. Si existe, lo actualiza; si no, lo crea
 */
export const saveFile = (file: MarkdownFile): void => {
  const files = getAllFiles();
  const index = files.findIndex(f => f.id === file.id);
  
  if (index >= 0) {
    // Actualizar archivo existente
    files[index] = { ...file, lastModified: Date.now() };
  } else {
    // Crear nuevo archivo
    files.push({ ...file, lastModified: Date.now() });
  }
  
  saveAllFiles(files);
};

/**
 * Elimina un archivo por su ID
 */
export const deleteFile = (id: string): void => {
  const files = getAllFiles();
  const newFiles = files.filter(file => file.id !== id);
  saveAllFiles(newFiles);
};

/**
 * Crea un nuevo archivo con contenido por defecto
 */
export const createNewFile = (name: string = 'untitled.md', content: string = '# Nuevo documento\n\nEscribe aquí tu contenido en Markdown.'): MarkdownFile => {
  const newFile: MarkdownFile = {
    id: `file-${Date.now()}`,
    name,
    content,
    lastModified: Date.now(),
  };
  
  saveFile(newFile);
  return newFile;
};

/**
 * Busca archivos según un término de búsqueda
 */
export const searchFiles = (query: string): MarkdownFile[] => {
  if (!query.trim()) return getAllFiles();
  
  const files = getAllFiles();
  const lowerQuery = query.toLowerCase();
  
  return files.filter(file => 
    file.name.toLowerCase().includes(lowerQuery) || 
    file.content.toLowerCase().includes(lowerQuery) ||
    (file.tags && file.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};

/**
 * Obtiene las configuraciones del editor
 */
export const getEditorSettings = (): EditorSettings => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? { ...DEFAULT_SETTINGS, ...JSON.parse(settings) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error al leer configuraciones de localStorage:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Guarda las configuraciones del editor
 */
export const saveEditorSettings = (settings: Partial<EditorSettings>): EditorSettings => {
  try {
    const currentSettings = getEditorSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error('Error al guardar configuraciones en localStorage:', error);
    return getEditorSettings();
  }
};

/**
 * Exporta todos los archivos como JSON
 */
export const exportFiles = (): string => {
  const files = getAllFiles();
  return JSON.stringify(files);
};

/**
 * Importa archivos desde un JSON
 */
export const importFiles = (jsonData: string): boolean => {
  try {
    const files = JSON.parse(jsonData) as MarkdownFile[];
    if (!Array.isArray(files)) return false;
    
    saveAllFiles(files);
    return true;
  } catch (error) {
    console.error('Error al importar archivos:', error);
    return false;
  }
};

/**
 * Guarda la última sesión del usuario (último archivo abierto)
 */
export const saveLastSession = (fileId: string): void => {
  saveEditorSettings({ lastOpenedFileId: fileId });
};

/**
 * Obtiene el ID del último archivo abierto
 */
export const getLastSessionFileId = (): string | undefined => {
  return getEditorSettings().lastOpenedFileId;
};

/**
 * Exporta un archivo individual como Markdown
 */
export const exportFileAsMarkdown = (fileId: string): string | null => {
  const file = getFileById(fileId);
  return file ? file.content : null;
};

/**
 * Marca o desmarca un archivo como favorito
 */
export const toggleFileFavorite = (fileId: string): MarkdownFile | undefined => {
  const file = getFileById(fileId);
  if (!file) return undefined;
  
  const updatedFile = {
    ...file,
    isFavorite: !file.isFavorite,
    lastModified: Date.now()
  };
  
  saveFile(updatedFile);
  return updatedFile;
};