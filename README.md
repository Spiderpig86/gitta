# 💎 Gittr

A simple CLI to generate and format your commit messages with an emoji, type, and scope. Gittr aims to streamline your commit messages to follow consistently with the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## ✨ Features

- Consistent commit messages every time.
- Customizable emojis and prefixes,
- Option to update from default or custom source for newly added emojis/prefixes.
- Quick lookup for emojis.

## 🚀 Installation

TBA

## ⚡ Commands

### `gittr -c/--commit`

Instantly commit you changes by answering a few short prompts.

```console
$ gittr -c

? Select an emoji (Use arrow keys or type to search)
> ✨ :sparkles: - Adding a new feature to the code.
  🐛 :bug: - Fixed bug in code.
  📒 :ledger: - Updated documentation for project.
  🍸 :cocktail: - Updated code formatting and styling.
  🎨 :art: - Refactoring code in project.
  ✅ :white_check_mark: - Adding or updating tests.
  🔧 :wrench: - Fixing unreported issue in code.
(Move up and down to reveal more choices)
? Select an emoji 🎨 :art: - Refactoring code in project.

? Specify file(s) updated constant.ts
? Set commit title Inherit name and version from package.json
? Set commit message
[master 017b307] :art: refactor(constant.ts): Inherit name and version from package.json 1 file changed, 2 insertions(+), 2 deletions(-)
```

### `gittr -e/--edit`

Open directory of emoji and prefixes files for editing.

```console
$ gittr -e

Opening emoji/prefix directory...
```

### `gittr -l/--list`

List configured (default + custom) emojis and prefixes for gittr.

*List emojis*

```console
$ gittr -l

? What data do you want to list out? (Use arrow keys)
> emojis
  prefixes

? What data do you want to list out? emojis
✨ :sparkles: (feat) - Adding a new feature to the code.
🐛 :bug: (fix) - Fixed bug in code.
📒 :ledger: (docs) - Updated documentation for project.
🍸 :cocktail: (style) - Updated code formatting and styling.
...
```

*List prefixes*

```console
$ gittr -l

? What data do you want to list out? (Use arrow keys)
  emojis
> prefixes

? What data do you want to list out? prefixes
feat (Feature) - Adding new feature to existing project.
bug (Bug Fix) - Fixing existing bugs.
chore (Chore) - Something that just had to be done.
docs (Documentation) - Adding documentation to project.
...
```

### `gittr -r/--reconfig`

Reconfigure gittr settings.

```console
$ gittr -r

? Automatically add all files to your commit. (Y/n) Y
? Choose how your emojis should be displayed. (Use arrow keys)
> :tada:
  🎉

? Choose how your emojis should be displayed. :tada:
? Set if commits should be signed by default. (Y/n) Y
? Set if Udacity style commits should be used (specify files affected by commit). (Y/n) Y
? Set Gittr emoji refresh url. (https://raw.githubusercontent.com/Spiderpig86/gittr/master/configuration/emojis.json)
? Set Gittr prefix refresh url. (https://raw.githubusercontent.com/Spiderpig86/gittr/master/configuration/prefixes.json)
```

### `gittr -s/--search`

Interactive search for emojis.

```console
$ gittr -s

? Search for emoji:  (Use arrow keys or type to search)
> ✨ :sparkles: (feat) - Adding a new feature to the code.
  🐛 :bug: (fix) - Fixed bug in code.
  📒 :ledger: (docs) - Updated documentation for project.
  🍸 :cocktail: (style) - Updated code formatting and styling.
  🎨 :art: (refactor) - Refactoring code in project.
  ✅ :white_check_mark: (test) - Adding or updating tests.
  🔧 :wrench: (chore) - Fixing unreported issue in code.
(Move up and down to reveal more choices)
```

### `gittr -u/--update`

Update emojis/prefixes from source specified in your configuration.

```console
$ gittr -u

✔ Succeeded fetching prefixes!
✔ Succeeded fetching emojis!
```

### `gittr -v/--version`

Get verison of gittr.

```console
$ gittr -v

0.0.1
```

## ⚙ Configuration

gittr can be configured in 2 places:

- `~/.gittr` - stores emoji and prefix files.
- `~/gittr-nodejs\Config\config.json` - settings handled by [Conf](https://www.npmjs.com/package/conf) when you configre with `gittr -r`. Note that the path is `AppData\Roaming\` for Windows.

You can actually add your own emojis and prefixes. All you need to do is add it to the `custom` sections. These will never be overwritten when using `gittr -u`.

*Emojis*

```
{
    "default": [
        {
            "emoji": "✨",
            "code": ":sparkles:",
            "type": "feat",
            "name": "sparkles",
            "description": "Adding a new feature to the code."
        }
    ],
    "custom": []
}
```

*Prefixes*

```
{
    "default": [
        {
            "name": "Feature",
            "description": "Adding new feature to existing project.",
            "prefix": "feat"
        }
    ],
    "custom": []
}
```

### Default Emojis

| emoji | code                        | type     | description                          |
|-------|-----------------------------|----------|--------------------------------------|
| ✨     | :sparkles:                  | feat     | Adding a new feature to the code.    |
| 🐛    | :bug:                       | fix      | Fixed bug in code.                   |
| 📒    | :ledger:                    | docs     | Updated documentation for project.   |
| 🍸    | :cocktail:                  | style    | Updated code formatting and styling. |
| 🎨    | :art:                       | refactor | Refactoring code in project.         |
| ✅     | :white_check_mark:          | test     | Adding or updating tests.            |
| 🔧    | :wrench:                    | chore    | Fixing unreported issue in code.     |
| 🚀    | :rocket:                    | chore    | Perfoming deployment for code.       |
| 🔒    | :lock:                      | chore    | Fixing security issues.              |
| 🚧    | :construction:              | feat     | Work in progress.                    |
| ⬆️    | :arrow_up:                  | chore    | Upgrading dependecies.               |
| ➕     | :heavy_plus_sign:           | chore    | Adding a dependency.                 |
| ➖     | :heavy_minus_sign:          | chore    | Removing a dependency.               |
| ⏪     | :rewind:                    | chore    | Reverting changes.                   |
| 🔀    | :twisted_rightwards_arrows: | chore    | Merging branches.                    |
| ❗️    | :heavy_exclamation_mark:    | feat     | Adding breaking changes.             |
| 🏷️   | :label:                     | chore    | Updating type definitions.           |
