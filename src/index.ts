import * as fs from 'fs';
import { minify } from './minifier/minifier';
import { ArgumentParser, ArgumentStore } from '@eigenspace/argument-parser';

const parser = new ArgumentParser();
const args: ArgumentStore = parser.get(process.argv.slice(2));

const inputPath = args.get('i') as string;
const outputPath = args.get('o') as string;

const inputFile = fs.readFileSync(inputPath, 'utf8');
const outputFile = minify(inputFile);

fs.writeFileSync(outputPath, outputFile);

export { minify };
