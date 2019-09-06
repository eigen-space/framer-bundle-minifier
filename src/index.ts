import * as fs from 'fs';
import { minify } from './minifier/minifier';
import { ArgumentParser, ArgumentStore } from '@eigenspace/argument-parser';

const parser = new ArgumentParser();
const args: ArgumentStore = parser.get(process.argv.slice(2));

const inputPath = args.get('from') as string;

const inputFileChunks = inputPath.split('.');
const [inputFileName] = inputFileChunks;
const fileExtension = 2 <= inputFileChunks.length ? `.${inputFileChunks[inputFileChunks.length - 1]}` : '';

const outputPath = args.get('to') as string || `${inputFileName}.min${fileExtension}`;

const inputFile = fs.readFileSync(inputPath, 'utf8');
const outputFile = minify(inputFile);

fs.writeFileSync(outputPath, outputFile);

export { minify };
