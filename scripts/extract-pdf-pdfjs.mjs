import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const docsDir = path.resolve(process.cwd(), 'docs');
const files = ['av2-mini-projeto.pdf', 'av2-guia-aluno.pdf'];

async function extract() {
  for (const f of files) {
    const filePath = path.join(docsDir, f);
    if (!fs.existsSync(filePath)) {
      console.warn(`Arquivo não encontrado: ${filePath}`);
      continue;
    }
    const data = new Uint8Array(fs.readFileSync(filePath));
    try {
      const loadingTask = getDocument({ data });
      const pdf = await loadingTask.promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
      }
      const outPath = path.join(docsDir, f.replace(/\.pdf$/i, '.txt'));
      fs.writeFileSync(outPath, fullText, 'utf8');
      console.log(`Extraído: ${outPath}`);
    } catch (err) {
      console.error(`Falha ao processar ${f}:`, err.message || err);
    }
  }
}

extract();
