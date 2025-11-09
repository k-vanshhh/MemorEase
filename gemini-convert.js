import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execp = promisify(exec);

const ARGS = process.argv.slice(2);
const APPLY = ARGS.includes("--apply");
const OUT_DIR_ARG_INDEX = ARGS.indexOf("--out");
const OUT_DIR = OUT_DIR_ARG_INDEX >= 0 ? ARGS[OUT_DIR_ARG_INDEX + 1] : "converted";
const DIR_ARG_INDEX = ARGS.indexOf("--dir");
const TARGET_DIR = DIR_ARG_INDEX >= 0 ? ARGS[DIR_ARG_INDEX + 1] : "components/ui";
const EXT_ARG_INDEX = ARGS.indexOf("--ext");
const EXT = EXT_ARG_INDEX >= 0 ? ARGS[EXT_ARG_INDEX + 1] : ".tsx";
const PROMPT_ARG_INDEX = ARGS.indexOf("--prompt");
const DEFAULT_PROMPT = `Convert the following TypeScript React .tsx component into plain JavaScript React .jsx:
- Remove TypeScript types
- Keep React logic and hooks intact
- Keep imports, but convert any .tsx-specific types to JS
- Do not delete files; output only the converted file contents
Wrap code in a single code block and nothing else.`;
const PROMPT = PROMPT_ARG_INDEX >= 0 ? ARGS[PROMPT_ARG_INDEX + 1] : DEFAULT_PROMPT;

async function findFiles(dir, ext) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...await findFiles(full, ext));
    } else if (ent.isFile() && path.extname(ent.name) === ext) {
      files.push(full);
    }
  }
  return files;
}

async function runGeminiOnFile(filePath) {
  // Use gemini CLI to ask conversion. We call gemini -f <file> "<prompt>"
  // If your gemini CLI uses a different command name, adjust here.
  const safePrompt = `${PROMPT}\n\nFile: ${path.basename(filePath)}\n\n===START OF FILE===\n\`\`\`\n${await fs.readFile(filePath, "utf8")}\n\`\`\`\n===END OF FILE===`;
  // For long prompts/contents, pass via temporary file to avoid shell quoting issues.
  const tmpFile = path.join(process.cwd(), ".gemini_tmp_prompt.txt");
  await fs.writeFile(tmpFile, safePrompt, "utf8");

  // Use the gemini CLI; change `gemini` to whichever binary you use (e.g., `npx gemini`).
  // We run with `--no-color` to get clean text output if your CLI supports it.
  const cmd = `gemini -f "${filePath}" --no-color < "${tmpFile}"`;
  try {
    const { stdout, stderr } = await execp(cmd, { maxBuffer: 10 * 1024 * 1024 });
    // Clean up tmp file
    await fs.unlink(tmpFile).catch(()=>{});
    // Extract the first code block if present (```...```)
    const codeMatch = stdout.match(/```(?:jsx|javascript|js)?\n([\s\S]*?)\n```/i);
    const body = codeMatch ? codeMatch[1].trim() : stdout.trim();
    return { success: true, output: body, raw: stdout, stderr };
  } catch (err) {
    // best-effort capture
    await fs.unlink(tmpFile).catch(()=>{});
    return { success: false, error: err, raw: err.stdout || "", stderr: err.stderr || "" };
  }
}

async function ensureOutDir(outDir) {
  try {
    await fs.mkdir(outDir, { recursive: true });
  } catch (e) { /* ignore */ }
}

async function main() {
  console.log("Gemini bulk converter — safe mode");
  console.log("Target dir:", TARGET_DIR, "ext:", EXT, "out:", OUT_DIR, "apply:", APPLY);
  // find files
  const absTarget = path.resolve(TARGET_DIR);
  const absOut = path.resolve(OUT_DIR);
  const files = await findFiles(absTarget, EXT);
  if (files.length === 0) {
    console.log("No files found with extension", EXT, "under", TARGET_DIR);
    return;
  }
  console.log(`Found ${files.length} files. Starting conversion (this may take time).`);
  await ensureOutDir(absOut);
  for (const file of files) {
    console.log("Converting:", file);
    const res = await runGeminiOnFile(file);
    if (!res.success) {
      console.error(`Failed to convert ${file}:`, res.error?.message || res.stderr);
      continue;
    }
    const outFileName = path.basename(file, EXT) + ".jsx";
    const outPath = APPLY ? file : path.join(absOut, outFileName);
    // Write output
    await fs.writeFile(outPath, res.output + "\n", "utf8");
    console.log(`Wrote converted -> ${outPath}`);
  }
  console.log("Conversion run finished. Inspect converted files in", absOut);
  if (!APPLY) {
    console.log("If happy, re-run with --apply to overwrite originals (make sure to git commit first).");
  } else {
    console.log("Applied changes to original files. Ensure you test and commit.");
  }
}

main().catch(err=>{
  console.error("Fatal error:", err);
  process.exit(1);
});
