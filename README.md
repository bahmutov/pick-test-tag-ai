# pick-test-tag-ai

> Pick E2E test tag using LLM based on pull request information example

[![ci](https://github.com/bahmutov/pick-test-tag-ai/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/bahmutov/pick-test-tag-ai/actions/workflows/main.yml)

📝 Read the blog post [Test Tag Suggestions Using AI](https://glebbahmutov.com/blog/test-tag-suggestions-using-ai/)

## Test tags

- `@smoke` a few tests that go through various features of the application
- `@add` tests go through creating new todos
- `@complete` tests are creating todos and then marking then complete and incomplete
- `@edit` tests edit text for existing todos
- `@routing` tests check if the app can show screens of completed and active todos
- `@persistence` tests check how todos are saved in the browser and loaded

See the current list of tests in file [support/index.d.ts](./cypress/support/index.d.ts)
