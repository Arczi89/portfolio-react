# Pre-commit Hook Setup

## Opis

Ten pre-commit hook automatycznie formatuje pliki w stagingu używając Prettier, bez zmieniania stanu stagingu.

## Jak to działa

1. **Wykrywa pliki w stagingu** - używa `git diff --cached` żeby znaleźć pliki, które są już w stagingu
2. **Formatuje tylko te pliki** - uruchamia Prettier tylko na plikach w stagingu
3. **Zachowuje staging** - ponownie dodaje sformatowane pliki do stagingu, zachowując ich stan

## Instalacja

### 1. Skopiuj hook do projektu

```bash
cp .git/hooks/pre-commit /path/to/your/project/.git/hooks/
chmod +x /path/to/your/project/.git/hooks/pre-commit
```

### 2. Zainstaluj Prettier (jeśli nie jest zainstalowany)

```bash
npm install --save-dev prettier
```

### 3. Stwórz plik konfiguracyjny .prettierrc (opcjonalnie)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## Obsługiwane formaty plików

- TypeScript: `.ts`, `.tsx`
- JavaScript: `.js`, `.jsx`
- JSON: `.json`
- Style: `.scss`, `.css`
- Markdown: `.md`

## Korzyści

- Formatuje tylko pliki, które chcesz commitować
- Nie zmienia stanu stagingu
- Automatyczne formatowanie przed każdym commitem
- Spójny styl kodu w całym projekcie
- Nie wpływa na pliki, które nie są w stagingu

## Rozwiązywanie problemów

### Hook nie działa

```bash
chmod +x .git/hooks/pre-commit
```

### Prettier nie jest zainstalowany

```bash
npm install --save-dev prettier
```

### Chcesz pominąć hook tymczasowo

```bash
git commit --no-verify -m "Your message"
```
