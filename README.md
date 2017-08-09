# exercism-config-visualizations

A collection cross-track configuration visualizations for Exercism.

This program uses for input a unified Exercism configuration file (the --uniconfig option) you may need to re-generate it from [exercism-uniconfig](https://www.npmjs.com/package/exercism-uniconfig). There is [one used by default](./data/uniconfig.json) but it may be outdated.

## Reports

### exercises

A listing of all active exercises per track

```bash
exercism-config-visualizations exercises
```

```text
bash (14): : hello-world, gigasecond, bob, leap, raindrops, difference-of-squares, pangram, anagram, hamming, rna-transcription, word-count, two-fer, phone-number, error-handling

...

vbnet (7): : bob, anagram, binary, allergies, atbash-cipher, accumulate, crypto-square
```

### exercise

This is a general dump of exercise information across tracks. You may use multiple slugs to show more than one exercise per track.

```bash
exercism-config-visualizations exercise hello-world
```

```text
┌─────────────┬────────────────────┬──────┬────────────────────────────────────────────────────────────────────────┐
│ Exercise    │ Track              │ Diff │ Topics                                                                 │
├─────────────┼────────────────────┼──────┼────────────────────────────────────────────────────────────────────────┤
│ hello-world │ Bash               │ 1    │ stdout                                                                 │
├─────────────┼────────────────────┼──────┼────────────────────────────────────────────────────────────────────────┤
│ ...         │                    │      │                                                                        │
├─────────────┼────────────────────┼──────┼────────────────────────────────────────────────────────────────────────┤
│ hello-world │ ECMAScript         │ 1    │ Control-flow (conditionals), Optional values, Strings, Text formatting │
├─────────────┼────────────────────┼──────┼────────────────────────────────────────────────────────────────────────┤
│ ...         │                    │      │                                                                        │
├─────────────┼────────────────────┼──────┼────────────────────────────────────────────────────────────────────────┤
│ hello-world │ Swift              │ 1    │ Text formatting, Optional values                                       │
└─────────────┴────────────────────┴──────┴────────────────────────────────────────────────────────────────────────┘
```

### topics

```bash
exercism-config-visualizations topics

```

```text
┌─────────────────────────────────────────────┬───────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Topic                                       │ Count │ Track                                                                                                                         │
├─────────────────────────────────────────────┼───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ strings                                     │ 363   │ c, cpp, csharp, ecmascript, elixir, fsharp, go, javascript, lisp, lua, objective-c, ocaml, php, python, r, ruby, scala, swift │
├─────────────────────────────────────────────┼───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ transforming                                │ 199   │ csharp, ecmascript, elixir, fsharp, go, javascript, lisp, lua, objective-c, ocaml, php, python, r, scala, swift               │
├─────────────────────────────────────────────┼───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ...                                         │       │                                                                                                                               │
├─────────────────────────────────────────────┼───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ metaprogramming                             │ 1     │ groovy                                                                                                                        │
└─────────────────────────────────────────────┴───────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
