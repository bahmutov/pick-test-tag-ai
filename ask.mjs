import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPEN_API_KEY'],
  baseURL: process.env['OPEN_AI_BASE_URL'],
})

async function ask(instructions, input) {
  const response = await client.responses.create({
    // https://platform.openai.com/docs/models
    model: 'gpt-4.1',
    instructions,
    input,
  })
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

const input = 'changing how items are stored'

const answer = await ask(instructions, input)

console.log(answer)
