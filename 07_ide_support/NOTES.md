# VSCode nodejs-testing extension

## Pros

- Helpful testing navigation bar
- Good debugging support

## Challenges

- Difficult to configure, especially with unstable features (e.g. decorators) or experimental loaders
- Difficult to configure for transpilation into ESM modules
- Extension does not always correctly update its status after configuration changes
- Does not always reliably detect all tests in the workspace
- Verbose logging is quite confusing

## Configuration

```json
{
  "nodejs-testing.nodejsPath": "path-to-node",
  "nodejs-testing.extensions": [
    {
      "extensions": [
        "mjs",
        "cjs",
        "js"
      ],
      "parameters": []
    },
    {
      "extensions": [
        "ts"
      ],
      "parameters": [
        "--enable-source-maps", "-r", "@swc-node/register"
      ]
    }
  ],
}
```
