import {db} from '@/app/db/drizzle'
import { centers, cities } from '@/app/db/schema/script';
import { city } from '@/app/models/city';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(request: NextRequest) {
  const req = await request.json();
  const {cityName, campuses}: city = req;
    try {
        console.log('sending request to db')
      const resCity = await db.insert(cities).values({
        cityName:cityName,
        
      }).returning({cityId: cities.cityId});

      // campuses?.map(async cent=>(
      //  await db.insert(centers).values({
      //   cityId: resCity[0].cityId,
      //     campus: cent.campus,
      //     centerName: cent.centerName,
      //     location: cent.location  
      //   }
      // ))
      // )
    
      console.log('response:',resCity)
      return NextResponse.json({ resCity });

    } catch (error) {
      return NextResponse.json({ Error: error });
    }
}