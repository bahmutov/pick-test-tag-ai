import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPEN_AI_API_KEY'],
  baseURL: process.env['OPEN_AI_BASE_URL'],
})

async function ask(instructions, input) {
  const response = await client.responses.create({
    // https://platform.openai.com/docs/models
    model: 'gpt-4.1', // usually gpt-4.1-mini or gpt-4.1
    instructions,
    input,
  })

  console.error('response usage:')
  console.error(response.usage)

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
