# Node module mocks

## Take-Aways

- The Jest-style mocking of module imports is an inofficial hack and explicitly not recommended by the node team
- Instead, one should use dependency-injection for all to-be-mocked dependencies
- In our experience, small-to-medium-size projects do not need a dependency-injection frameweork for this
- For larger projects, we are using `inversify` which also provides straightforward support for injecting external modules (e.g. `axios`) or globals (e.g. `fetch`)
- Nevertheless, this design change could pose a large migration effort if a project wants to move from Jest to the node test runner
