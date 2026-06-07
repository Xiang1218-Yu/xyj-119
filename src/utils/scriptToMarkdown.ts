import { ScriptFramework } from '@/types';

export const scriptToMarkdown = (script: ScriptFramework, selectedTitles?: Array<{ title: string }>): string => {
  const lines: string[] = [];

  lines.push(`# ${script.title}`);
  lines.push('');
  lines.push(`**时长：** ${script.totalDuration}`);
  lines.push('');

  if (selectedTitles && selectedTitles.length > 0) {
    lines.push('## 📝 备选标题');
    lines.push('');
    selectedTitles.forEach((t, i) => {
      lines.push(`${i + 1}. **${t.title}**`);
    });
    lines.push('');
  }

  lines.push('## 🎬 开头引入');
  lines.push('');
  lines.push(`> **类型：** ${script.hook.type} | **时长：** ${script.hook.duration}`);
  lines.push('');
  lines.push(script.hook.content);
  lines.push('');

  lines.push('## 📑 正文分论点');
  lines.push('');
  script.body.forEach((section, index) => {
    lines.push(`### ${index + 1}. ${section.title}`);
    lines.push('');
    lines.push(`**时长：** ${section.duration}`);
    lines.push('');
    lines.push(section.content);
    lines.push('');
    if (section.goldenQuote) {
      lines.push(`> 💡 **金句：** ${section.goldenQuote}`);
      lines.push('');
    }
  });

  lines.push('## ✨ 金句推荐');
  lines.push('');
  script.goldenQuotes.forEach((quote) => {
    lines.push(`- **[${quote.type}]** ${quote.content}  \n  *位置：${quote.position}*`);
  });
  lines.push('');

  lines.push('## 🎁 彩蛋规划');
  lines.push('');
  script.easterEggs.forEach((egg, index) => {
    lines.push(`${index + 1}. **[${egg.type}]** ${egg.description}  \n   *位置：${egg.position}*`);
  });
  lines.push('');

  lines.push('## 🌟 结尾升华');
  lines.push('');
  lines.push(`**时长：** ${script.ending.duration}`);
  lines.push('');
  lines.push(script.ending.content);
  lines.push('');

  lines.push('## 👋 互动引导');
  lines.push('');
  lines.push(script.ending.callToAction);
  lines.push('');

  return lines.join('\n');
};

export const markdownToHtml = (markdown: string): string => {
  const html = markdown
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.125rem; font-weight: 600; color: #1e293b; margin: 1rem 0 0.5rem 0;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.375rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.75rem 0;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 2rem 0 1rem 0;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em style="font-style: italic;">$1</em>')
    .replace(/`([^`]+)`/gim, '<code style="background: #f1f5f9; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.875em;">$1</code>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid #8b5cf6; padding: 0.75rem 1rem; margin: 1rem 0; color: #475569; background: #faf5ff; border-radius: 0 0.5rem 0.5rem 0;">$1</blockquote>')
    .replace(/^- \*\*\[(.*?)\]\*\* (.*?) {2}\\n/gim, '<div style="margin: 0.5rem 0; padding: 0.5rem 0;"><span style="color: #8b5cf6; font-weight: 600;">[$1]</span> $2</div>')
    .replace(/^- (.*$)/gim, '<div style="margin: 0.5rem 0; padding-left: 1rem; position: relative;"><span style="position: absolute; left: 0; color: #8b5cf6;">•</span>$1</div>')
    .replace(/^\d+\. \*\*\[(.*?)\]\*\* (.*?) {2}\\n/gim, '<div style="margin: 0.75rem 0; padding: 0.5rem 0;"><span style="font-weight: 700; color: #7c3aed;">[$1]</span> $2</div>')
    .replace(/^\d+\. (.*$)/gim, '<div style="margin: 0.5rem 0; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0; font-weight: 600; color: #64748b;"></span>$1</div>');

  const lines = html.split('\n');
  let inParagraph = false;
  const processedLines: string[] = [];

  for (const line of lines) {
    if (line.trim() === '') {
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      continue;
    }
    if (!inParagraph && !line.startsWith('<h') && !line.startsWith('<div') && !line.startsWith('<blockquote')) {
      processedLines.push('<p style="margin: 0.75rem 0; line-height: 1.75; color: #334155;">');
      inParagraph = true;
    }
    processedLines.push(line);
  }
  if (inParagraph) {
    processedLines.push('</p>');
  }

  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.75; color: #1e293b; max-width: 800px; padding: 1rem;">${processedLines.join('')}</div>`;
};
