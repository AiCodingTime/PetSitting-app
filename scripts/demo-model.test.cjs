const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/demo/model.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = module.paths;
loaded._compile(compiled, filename);
const { hourlyRate, quote, validDate, validateVisits, overlaps } = loaded.exports;
const visit = (date = '2026-10-14', start = '09:00', end = '10:00') => ({ date, start, end });

test('all animal pricing tiers match the product specification', () => {
  assert.deepEqual(Array.from({ length: 10 }, (_, i) => hourlyRate(i + 1)), [15, 15, 20, 20, 25, 25, 35, 35, 50, 50]);
  assert.equal(hourlyRate(0), 0);
  assert.equal(hourlyRate(11), 0);
});
test('multiple blocks across days total fractional hours without owner markup', () => {
  const result = quote(3, [visit(undefined, '09:00', '10:30'), visit('2026-10-15', '17:00', '18:00')]);
  assert.deepEqual(result, { rate: 20, hours: 2.5, gross: 50, fee: 12.5, payout: 37.5 });
});
test('round financial values to cents', () => {
  const result = quote(1, [visit(undefined, '09:00', '09:01')]);
  assert.equal(result.gross, 0.25);
  assert.equal(result.fee, 0.06);
  assert.equal(result.payout, 0.19);
});
test('allow adjacent visits but reject overlap', () => {
  assert.equal(overlaps(visit(), visit(undefined, '10:00', '11:00')), false);
  assert.equal(validateVisits([visit(), visit(undefined, '10:00', '11:00')]), null);
  assert.match(validateVisits([visit(), visit(undefined, '09:30', '11:00')]), /overlap/);
});
test('check every visit against blocked time on its date', () => {
  assert.match(validateVisits([visit('2026-10-13'), visit()], [visit()]), /unavailable/);
  assert.equal(validateVisits([visit('2026-10-13')], [visit()]), null);
});
test('reject empty, reversed, and malformed visits', () => {
  assert.match(validateVisits([]), /at least one/);
  for (const [start, end] of [['12:00', '11:00'], ['09:00', '09:00'], ['24:00', '25:00'], ['9am', '10am']]) {
    assert.match(validateVisits([visit(undefined, start, end)]), /24-hour/);
  }
});
test('validate calendar dates including leap days', () => {
  assert.equal(validDate('2026-02-30'), false);
  assert.equal(validDate('2024-02-29'), true);
  assert.equal(validDate('2026-02-29'), false);
  assert.equal(validDate('2026-13-01'), false);
});
test('reject visits earlier than the demo clock', () => {
  assert.match(validateVisits([visit('2026-10-11')]), /valid date/);
  assert.equal(validateVisits([visit('2026-10-12')]), null);
});
test('validation does not modify caller data', () => {
  const visits = Object.freeze([Object.freeze(visit())]);
  assert.equal(validateVisits(visits), null);
});
