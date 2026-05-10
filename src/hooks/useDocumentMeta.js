import { useEffect } from 'react';

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
