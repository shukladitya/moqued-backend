export const dummyExample = [
  {
    name: 'ISRO Launch Vehicles',
    route: '/get-vehicals',
    description:
      'This api will provide list of all ISRO launch vehicles, each object in array will contain name, year of last launch and description of the vehicle.',
    schema: `'[
        {
            "name": "PSLV",
            "lastLaunch": {
                "year": 2020,
                "date": "2020-10-01T00:00:00.000Z",
                "place": "Satish Dhawan Space Centre"
            },
            "image": "imageUrl",
            "description": "The Polar Satellite Launch Vehicle is an expendable medium-lift launch vehicle designed and operated by the Indian Space Research Organisation"
        }
    ]'`,
  },
  {
    name: 'Dog Cat Tinder',
    route: '/get-profile',
    description:
      'This api will provide list of profiles for dogs and cats. Each object will contain name, age, owner and image of the pet.',
    schema: `'[
        {
            "name": "Caeser",
            "age": 5,
            "owner": "John",
            "image": "imageUrl"
        },
        {
            "name": "Daisy",
            "age": 3,
            "owner": "Jane",
            "image": "imageUrl"
        }
    ]'`,
  },
  {
    name: 'Alien job portal',
    route: '/get-jobs',
    description:
      'This api will provide list of jobs for aliens. Each object will contain job title, company, description and intergalactic location for the job.',
    schema: `'[
        {
            "title": "Millennium Falcon operator",
            "company": "Alienzon",
            "description": "Millennium Falcon operator needed, Entry level, total work experience of 1 galactic year",
            "location": "Sagittarius A*"
        }
    ]'`,
  },
];
