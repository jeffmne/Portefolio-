/**
 * Génère les QR codes du portfolio dans `public/qr/`.
 *
 *     npm i --no-save qrcode && node scripts/generate-qr.mjs
 *
 * `qrcode` n'est volontairement pas une dépendance du projet : le site ne
 * génère aucun QR à l'exécution, ce sont des fichiers produits une fois puis
 * versionnés. D'où le `--no-save`, qui laisse `package.json` intact.
 *
 * À relancer uniquement si `siteConfig.url` change — un QR déjà imprimé, lui,
 * ne se met pas à jour.
 */
import QRCode from 'qrcode';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'public/qr');

/** L'URL reste définie à un seul endroit : `siteConfig.url`. */
function readSiteUrl() {
  const source = readFileSync(resolve(ROOT, 'src/lib/data.ts'), 'utf8');
  const match = source.match(/url:\s*'([^']+)'/);
  if (!match?.[1]) {
    throw new Error('Impossible de lire `siteConfig.url` dans src/lib/data.ts');
  }
  return match[1];
}

/**
 * Niveau Q : 25 % de redondance. Un QR imprimé sur un CV se plie, se salit
 * et se photocopie — la correction d'erreur n'est pas du luxe. `margin: 4`
 * est la zone de silence normalisée, sans laquelle un scanner peut échouer.
 */
const OPTIONS = { errorCorrectionLevel: 'Q', margin: 4 };

/**
 * Côté imprimé, zone de silence comprise. 30 mm pour 41 modules donne
 * 0,73 mm par module, largement au-dessus du plancher de lisibilité
 * (~0,4 mm) d'un appareil photo de téléphone à 25 cm.
 */
const PRINT_MM = 30;

const VARIANTS = [
  { name: 'portfolio-qr', dark: '#000000ff' },
  { name: 'portfolio-qr-bleu', dark: '#1d4ed8ff' },
];

const url = readSiteUrl();
mkdirSync(OUT, { recursive: true });

for (const variant of VARIANTS) {
  const options = { ...OPTIONS, color: { dark: variant.dark, light: '#ffffffff' } };

  // Sans `width` / `height` explicites, un traitement de texte place le
  // symbole à une taille arbitraire : on le calibre en millimètres.
  const svg = (await QRCode.toString(url, { ...options, type: 'svg' })).replace(
    '<svg xmlns="http://www.w3.org/2000/svg"',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PRINT_MM}mm" height="${PRINT_MM}mm"`,
  );
  writeFileSync(`${OUT}/${variant.name}.svg`, svg);

  await QRCode.toFile(`${OUT}/${variant.name}.png`, url, {
    ...options,
    type: 'png',
    width: 1200,
  });

  console.log(`${variant.name} — svg + png`);
}

console.log(`\nURL encodée : ${url}`);
