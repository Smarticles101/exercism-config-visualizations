# exercism-config-visualizations

A collection of cross-track configuration visualizations for Exercism.

## Install

```bash
npm install -g exercism-config-visualizations
```

## Usage

```bash
exercism-config-visualizations --format csv --uniconfig ./data/uniconfig.json averages
```

* format - choose the [output format](#output-format) for the output, defaults to csv
* uniconfig - the location of your [uniconfig file](#uniconfig), defaults to internal (probably outdated) uniconfig. May also be provided via stdin

## Uniconfig
This program uses for input a unified Exercism configuration file (the --uniconfig option or piped in via stdin) you may need to re-generate it from [exercism-uniconfig](https://www.npmjs.com/package/exercism-uniconfig). There is [one used by default](./data/uniconfig.json) but it may be outdated.

You can pipe the input from exercism-uniconfig directly into this program.
```bash
exercism-uniconfig | exercism-config-visualizations topics
```

It is more efficient to save it locally as a file and re-use that.

## Output Format

You may output the results of a standard report in a number of formats.

* md - a markdown table, good for including in [GitHub text](https://help.github.com/articles/organizing-information-with-tables/) (default)
* csv - useful for opening as a spreadsheet program or piping to another processor
* table - a no-frills text-based table
* json - a JSON file with data embedded in a two-dimensional array

## Contribute

This has been designed to make it easy to create your own reports. Make a file named with the slug for your report in [reports](reports/). See the [exercise-count](reports/exercise-count.js) report as a good example of how to make a new report. I encourage others to submit any interesting reports for inclusion in the tool.

If you return false the program will assume you handled output yourself. Otherwise return a string for that output. If you want to take advantage of CSV or tabular output return a multi-dimensional array with headers as the first row.


## Reports

- [unconfigured](#unconfigured) - List Track(s) that are missing: Diff(iculty) or Topics
- [exercises](#exercises) - Active exercises per track: Track, Count, Exercises
- [exercise](#exercise) - Information about exercises across tracks: Exercise, Track, Diff(iculty), Topics
- [exercise-count](#exercise-count) - List the number of exercises per track: Track, Exercise Count
- [implementation-count](#implementation-count) - List # of exercise implementations: Exercise, Count, Tracks
- [topics](#topics) - All topics used across all tracks: Topic, Count, Tracks (using this topic)
- [averages](#averages) - The average values of track configuration: Track, Diff(iculty), Topics (per exercise) 
- [difficulty](#difficulty) - Group exercises by difficulty level: Track, Diff(iculty), Count, Exercises 

### unconfigured

List tracks without topics or difficulty set.

```bash
exercism-config-visualizations unconfigured
```

```text
| Track        | Diff | Topics |
| ------------ | ---- | ------ |
| clojure      | no   | no     |
| coffeescript | no   | no     |
...
| sml          | no   | no     |
| vbnet        | no   | no     |

```

### exercises

A listing of all active exercises per track.

```bash
exercism-config-visualizations exercises --format csv
```

```csv
Track,Count,Exercises
bash,14,"hello-world, gigasecond, bob, leap, raindrops, difference-of-squares, pangram, anagram, hamming, rna-transcription, word-count, two-fer, phone-number, error-handling"
...
vbnet,7,"bob, anagram, binary, allergies, atbash-cipher, accumulate, crypto-square"
```

### exercise

This is a general dump of exercise information across tracks. You may use multiple slugs to show more than one exercise per track.

```bash
exercism-config-visualizations exercise hello-world --format table
```

```text
Exercise     Track         Diff  Topics
hello-world  bash          1     stdout
hello-world  c             1     control-flow (if-statements), optional values, text formatting
...
hello-world  scala         1     Strings
hello-world  swift         1     Text formatting, Optional values
```

### exercise-count
This is a listing of track slug and number of exercises present in the configfile.

```bash
exercism-config-visualizations exercise-count --format json
```

```json
[["Track","Exercise Count"],["csharp",107],["fsharp",104],["ruby",89],["python",87],["go",87],["scala",86],["java",85],["elixir",85],["haskell",82],["javascript",77],["swift",75],["lua",75],["ecmascript",74],["perl5",65],["rust",64],["clojure",60],["php",52],["objective-c",42],["ocaml",41],["erlang",38],["c",38],["cpp",38],["lisp",30],["r",29],["perl6",24],["coffeescript",21],["dlang",18],["bash",14],["groovy",13],["plsql",10],["sml",8],["vbnet",7],["powershell",2]]
```

### implementation-count
This lists all the exercises found in the configfiles, # of occurrences and list the tracks that implement it.

```bash
exercism-config-visualizations implementation-count
```

```text
| Exercise                  | Count | Tracks                                                                                                                                                                                                                     |
| ------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hamming                   | 30    | bash, c, clojure, cpp, dlang, csharp, ecmascript, elixir, fsharp, erlang, go, groovy, haskell, java, javascript, lisp, lua, objective-c, ocaml, perl5, php, plsql, powershell, python, r, ruby, rust, scala, sml, swift    |
| hello-world               | 29    | bash, c, clojure, cpp, coffeescript, dlang, csharp, ecmascript, elixir, fsharp, erlang, go, groovy, haskell, java, javascript, lua, objective-c, ocaml, perl5, perl6, php, powershell, python, r, ruby, rust, scala, swift |
...
                                                                                                               |
| luhn-trait                | 1     | rust                                                                                                                                                                                                                       |
| nucleotide-codons         | 1     | rust                                                                                                        
```

### topics

Outputs a listing of topics ordered by usage frequency descending with listing of tracks using that topic. The Topic name is lowercased due to some inconsistent casing between tracks.

```bash
exercism-config-visualizations topics --format table
```

```text
Topic                                        Count  Track
strings                                      363    c, cpp, csharp, ecmascript, elixir, fsharp, go, javascript, lisp, lua, objective-c, ocaml, php, python, r, ruby, scala, swift
transforming                                 199    csharp, ecmascript, elixir, fsharp, go, javascript, lisp, lua, objective-c, ocaml, php, python, r, scala, swift
...
function overloading                         1      scala
metaprogramming                              1      groovy
```

### averages

Outputs the average difficulty and number of topics assigned to each exercise.

```bash
exercism-config-visualizations averages
```

```text
| Track        | Diff | Topics |
| ------------ | ---- | ------ |
| bash         | 1.50 | 1.93   |
| c            | 2.63 | 3.11   |
...
| sml          | 1    | 0      |
| swift        | 3.79 | 2.06   |
| vbnet        | 1    | 0      |
```

### difficulty

Listing of exercises grouped by difficulty level. You may specify multiple tracks for a combined listing.

```bash
bin/exercism-config-visualizations difficulty go --format table
```

```text
Track  Diff  Count  Exercises
go     1     8      hello-world, leap, gigasecond, hamming, raindrops, accumulate, etl, scrabble-score
go     2     9      pangram, bob, difference-of-squares, grains, luhn, rna-transcription, roman-numerals, strain, nucleotide-count
go     3     25     clock, acronym, triangle, series, parallel-letter-frequency, isogram, crypto-square, largest-series-product, sieve, protein-translation, anagram, word-count, robot-name, atbash-cipher, phone-number, prime-factors, nth-prime, beer-song, wordy, meetup, tree-building, kindergarten-garden, simple-cipher, tournament, all-your-base
go     4     13     twelve-days, house, pascals-triangle, bank-account, food-chain, perfect-numbers, allergies, diamond, custom-set, pig-latin, matrix, word-search, ledger
go     5     18     error-handling, secret-handshake, queen-attack, sum-of-multiples, pythagorean-triplet, circular-buffer, transpose, diffie-hellman, grade-school, saddle-points, binary-search, binary-search-tree, paasio, minesweeper, poker, variable-length-quantity, change, bowling
go     6     2      palindrome-products, robot-simulator
go     7     4      bracket-push, say, ocr-numbers, pov
go     8     1      forth
go     9     2      react, connect
```
