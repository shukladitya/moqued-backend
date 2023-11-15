import { JsonDto } from '../dtos/app.dto';

export const generateJsonGetPrompt = (body: JsonDto) =>
  `You need to generate dummy Array of JSON data for the api named '${body.apiName}' which is based on the description provided between the triple backticks.
  '''${body.apiDescription}'''
  Keep in mind that if any image or photo url that needs to be provided in the response SHOULD lead directly to the actual image. Use any of the following image services: Unsplash, Pexels, Pixabay, Lorem Picsum to provide random images that are relevent to the api(example: if its a api about dogs use dog images, if its an alien related data use alien photos like https://source.unsplash.com/featured/?alien).
  
 !!! NEVER RETURN ANYTHING OTHER THAN THE JSON DATA. YOUR FINAL RESPONSE MUST ONLY CONTAIN THE JSON DATA.!!!`;
