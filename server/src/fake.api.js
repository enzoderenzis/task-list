import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
const DEFAULT_QUANTITY = 3;


export default async function callFakeApi(size = DEFAULT_QUANTITY) {
  const response = await fetch(`https://lorem-faker.vercel.app/api?quantity=${size}`).then((res) => res.json());
  return response.map(r => ({
      uuid: uuidv4(),
      title: r,
  }));
}
