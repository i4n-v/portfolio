import { getAgeByDate } from '@/utils';
import { NextResponse } from 'next/server';

function GET() {
  const owner = {
    name: 'Ian Vinícius',
    age: getAgeByDate('2002/06/02'),
    stacks: ['UI/UX', 'Front End', 'Back End'],
  };

  return NextResponse.json(owner);
}

export { GET };
