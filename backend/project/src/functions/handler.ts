// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any): Promise<any> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Here you can implement your logic to handle the event
  // For example, you might want to process the event data and return a response

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from the handler!',
      input: event,
    }),
  };
};
