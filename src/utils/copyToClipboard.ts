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
    } catch (execError) {
      document.body.removeChild(textArea);
      return { success: false, error: '复制命令执行异常' };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : '未知错误' };
  }
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
