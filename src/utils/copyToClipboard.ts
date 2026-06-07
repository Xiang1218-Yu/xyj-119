export interface CopyResult {
  success: boolean;
  error?: string;
}

export const copyToClipboard = async (text: string): Promise<CopyResult> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true };
    }
    
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        return { success: true };
      } else {
        return { success: false, error: '复制命令执行失败' };
      }
    } catch {
      document.body.removeChild(textArea);
      return { success: false, error: '复制命令执行异常' };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : '未知错误' };
  }
};

export const copyRichTextToClipboard = async (
  markdown: string,
  html?: string
): Promise<CopyResult> => {
  try {
    const htmlContent = html || markdownToHtml(markdown);
    
    if (navigator.clipboard && window.isSecureContext && ClipboardItem) {
      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([markdown], { type: 'text/plain' }),
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
      });
      await navigator.clipboard.write([clipboardItem]);
      return { success: true };
    }
    
    const fallbackResult = await copyRichTextFallback(markdown, htmlContent);
    if (fallbackResult.success) {
      return { success: true };
    }
    
    return await copyToClipboard(markdown);
  } catch {
    return await copyToClipboard(markdown);
  }
};

const copyRichTextFallback = async (
  markdown: string,
  html: string
): Promise<CopyResult> => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.left = '-999999px';
    container.style.top = '-999999px';
    container.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(container);
    
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(container);
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    try {
      const successful = document.execCommand('copy');
      selection?.removeAllRanges();
      document.body.removeChild(container);
      
      if (successful) {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: '复制命令执行失败' });
      }
    } catch {
      selection?.removeAllRanges();
      document.body.removeChild(container);
      resolve({ success: false, error: '复制命令执行异常' });
    }
  });
};

export const markdownToHtml = (markdown: string): string => {
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin: 1rem 0 0.5rem 0;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.75rem 0;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin: 2rem 0 1rem 0;">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/\*(.*)\*/gim, '<em style="font-style: italic;">$1</em>')
    .replace(/`([^`]+)`/gim, '<code style="background: #f1f5f9; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.875em;">$1</code>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 1rem; margin: 1rem 0; color: #475569; font-style: italic;">$1</blockquote>')
    .replace(/^- \[(.*)\] (.*)$/gim, '<li style="margin: 0.5rem 0;"><span style="color: #8b5cf6; font-weight: 500;">[$1]</span> $2</li>')
    .replace(/^- (.*$)/gim, '<li style="margin: 0.5rem 0;">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li style="margin: 0.5rem 0;">$1</li>')
    .replace(/\n\n/gim, '</p><p style="margin: 0.75rem 0; line-height: 1.75;">')
    .replace(/\n/gim, '<br>');
  
  html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.75; color: #1e293b; max-width: 800px;"><p style="margin: 0.75rem 0; line-height: 1.75;">${html}</p></div>`;
  
  return html;
};

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const existingToast = document.getElementById('app-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    z-index: 9999;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #EF4444, #DC2626)'};
    box-shadow: 0 10px 40px ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  const icon = type === 'success' 
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  
  toast.innerHTML = `${icon}<span>${message}</span>`;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2500);
};
