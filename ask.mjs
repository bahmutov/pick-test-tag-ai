import OpenAI from 'openai'
import actionsCore from '@actions/core'

const client = new OpenAI({
  apiKey: process.env['OPEN_AI_API_KEY'],
  baseURL: process.env['OPEN_AI_BASE_URL'],
})

async function ask(instructions, input) {
  // usually gpt-4.1-mini or gpt-4.1
  const model = 'gpt-4.1'
  const response = await client.responses.create({
    // https://platform.openai.com/docs/models
    model,
    instructions,
    input,
  })

  console.error('response usage:')
  console.error(response.usage)

  // set actions outputs
  actionsCore.setOutput('testTag', response.output_text)
  actionsCore.setOutput('inputTokens', response.usage.input_tokens)
  actionsCore.setOutput('outputTokens', response.usage.output_tokens)
  actionsCore.setOutput('totalTokens', response.usage.total_tokens)
  actionsCore.setOutput('model', model)
  // set actions summary
  // print a table with:
  // - found test tag
  // - model
  // - input and output tokens
  actionsCore.summary.addHeading('Test Tag Result')
  actionsCore.summary
    .addTable([
      ['**Found Test Tag**', response.output_text],
      ['**Model**', model],
      ['**Input Tokens**', String(response.usage.input_tokens)],
      ['**Output Tokens**', String(response.usage.output_tokens)],
      ['**Total Tokens**', String(response.usage.total_tokens)],
    ])
    .addLink(
      'bahmutov/pick-test-tag-ai',
      'https://github.com/bahmutov/pick-test-tag-ai',
    )
    .write()

  return response.output_text
}

const instructions = `
  Give the following end-to-end test tags:
    - @smoke a few tests that go through various features of the application
    - @add tests go through creating new todos
    - @complete tests are creating todos and then marking then complete and incomplete
    - @edit tests edit text for existing todos
    - @routing tests check if the app can show screens of completed and active todos
    - @persistence tests check how todos are saved in the browser and loaded

  Determine which test tag is applicable to the following code changes.

  Response with the test tag by itself and nothing else.
  If no test tag is applicable, return "@smoke".
`

const input = process.env['CODE_CHANGES']
if (!input) {
  throw new Error('CODE_CHANGES environment variable is required')
}

// output logging into error stream
console.error('Asking OpenAI for test tags...')
console.error(input)

const answer = await ask(instructions, input)

console.log(answer)
