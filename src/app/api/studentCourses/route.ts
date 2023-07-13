import { db } from "@/app/db/drizzle";
import { batchCourses, batchQuarters, batches, centers, cities, courses, quarters, regStudents, studentCourses, timeSlots } from "@/app/db/schema/script";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm'

type Prop = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const result = await db.selectDistinct({
        studentId: regStudents.studentId,
        fullName: regStudents.fullName,
        quarterName: quarters.quarterName,
        courseName: courses.courseName,
        batchName: batches.batchName,
        campus: centers.campus,
        day: timeSlots.slotDay,
        fee: timeSlots.qtrFee,
        location: centers.location
    }).from(regStudents)
        .leftJoin(studentCourses, eq(regStudents.studentId, studentCourses.studentId))
        .leftJoin(batchQuarters, eq(studentCourses.batchQuarterId, batchQuarters.batchQuarterId))
        .leftJoin(quarters, eq(batchQuarters.quarterId, quarters.quarterId))
        .leftJoin(batchCourses, eq(batchCourses.batchCourseId, batchQuarters.batchCourseId))
        .leftJoin(courses, eq(courses.courseId, batchCourses.batchCourseId))
        .leftJoin(batches, eq(batches.batchId, batchCourses.batchId))
        .leftJoin(timeSlots, eq(timeSlots.batchQuarterId, batchQuarters.batchQuarterId))
        .leftJoin(centers, eq(centers.centerId, timeSlots.centerId))
        .leftJoin(cities, eq(cities.cityId, centers.cityId))
        .where(eq(regStudents.studentId, parseInt(id as string)))


    if (result) {
        return NextResponse.json(result)
    } else {
        return new NextResponse(null, {
            status: 404,
            statusText: `No Recrod found with id ${id}`,
        })
    }

}