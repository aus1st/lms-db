import {db} from '@/app/db/drizzle'
import { city } from '@/app/db/schema/script';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(request: NextRequest) {
  const req = await request.json();
  const {cityName} = req;
    try {
        console.log('sending request to db')
      const res = await db.insert(city).values({
        cityName:cityName  
      }).returning();
    console.log('response:',res)
      return NextResponse.json({ res });

    } catch (error) {
      return NextResponse.json({ Error: error });
    }
}