import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

const docsDir = path.resolve(process.cwd(), 'docs');
const files = ['av2-mini-projeto.pdf', 'av2-guia-aluno.pdf'];

async function extract() {
  for (const f of files) {
    const filePath = path.join(docsDir, f);
    if (!fs.existsSync(filePath)) {
      console.warn(`Arquivo não encontrado: ${filePath}`);
      continue;
    }
    const data = fs.readFileSync(filePath);
    try {
      const parsed = await pdfParse(data);
      const outPath = path.join(docsDir, f.replace(/\.pdf$/i, '.txt'));
      fs.writeFileSync(outPath, parsed.text, 'utf8');
      console.log(`Extraído: ${outPath}`);
    } catch (err) {
      console.error(`Falha ao processar ${f}:`, err.message || err);
    }
  }
}

extract();
