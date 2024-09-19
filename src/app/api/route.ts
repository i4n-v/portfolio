import { getAgeByDate } from '@/utils';

function GET() {
  const owner = {
    name: 'Ian Vinícius',
    age: getAgeByDate('2002/06/02'),
    stacks: ['UI/UX', 'Front End', 'Back End'],
  };

  return Response.json(owner);
}

export { GET };
