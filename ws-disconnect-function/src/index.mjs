export const handler = async (event) => {
  console.log('event', JSON.stringify(event));

  return {
    body: JSON.stringify(event),
    headers: {
      'content-type': 'application/json',
    },
    statusCode: 200,
  };
};
