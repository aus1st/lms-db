import { relations } from 'drizzle-orm';
import { serial, varchar, timestamp, date, pgTable, integer, boolean, decimal, text, time } from 'drizzle-orm/pg-core';



export const roles = pgTable('roles', {
    roleId: serial('role_id').primaryKey(),
    roleName: varchar('role_name', {
        length: 50
    }),
    createdOn: timestamp('created_date').defaultNow()
})

export const users = pgTable('users', {
    userId: serial('user_id').primaryKey(),
    userName: varchar('user_name', {
        length: 500
    }),
    cnic: varchar('cnic', {
        length: 50
    }),
    password: varchar('password', {
        length: 3000
    }),
    emailVerificationToken: varchar('email_verification_token', {
        length: 3000
    }),
    emailVerified: boolean('email_verfied'),
    isActive: boolean('is_active'),

    //currently setting user with role as user would have only one role (it could be one to many)
    roleId: integer('role_id').references(() => roles.roleId),
    status: varchar('status', {
        length: 50
    }),
    isBlocked: boolean('is_blocked'),
    blockReason: varchar('block_reason', {
        length: 1000
    }),
    createdOn: timestamp('created_date').defaultNow(),
    updatedOn: timestamp('updated_date'),
    updatedBy: timestamp('update_by')

});

export const cities = pgTable('cities', {
    cityId: serial('city_id').primaryKey(),
    cityName: varchar('city_name', {
        length: 200
    }).notNull(),
    createdOn: timestamp('created_date').defaultNow()
});




export const centers = pgTable('centers', {
    centerId: serial('center_id').primaryKey(),
    centerName: varchar('center_name', {
        length: 200
    }),
    campus: varchar('campus', {
        length: 200
    }),
    cityId: integer('city_id').references(() => cities.cityId),
    location: varchar('location', {
        length: 300
    }),
    createdOn: timestamp('created_date').defaultNow()

});


export const regStudents = pgTable('reg_students', {
    studentId: serial('student_id').primaryKey(),
    user_id: integer('user_id').references(() => users.userId),
    fullName: varchar('full_name', {
        length: 100,
    }),
    dob: date('dob'),
    gender: varchar('gender', {
        length: 10
    }),
    contactNo: varchar('contact_no', {
        length: 50
    }),
    lastQualification: varchar('last_qualification', {
        length: 50
    }),
    homeAddress: varchar('home_address', {
        length: 500
    }),
    imgUrl: varchar('image_url', {
        length: 200
    }),
    cityId: integer('city_id').references(() => cities.cityId),
    distanceLearning: boolean('distance_learning'),
    roll_internal: varchar('roll_internal', {
        length: 20
    }),
    rollNo: varchar('roll_no', {
        length: 20
    }),
    status: varchar('status', {
        length: 20
    }),
    rejectReason: varchar('reject_reason', {
        length: 200
    }),
    signUpDate: date('signup_date'),
    entryTestResult: varchar('entry_test_result', {
        length: 200
    }),
    studentRefId: integer('student_ref_id'),
    percentile: decimal('percentile', {
        precision: 3
    }),
    rank: integer('rank'),
    onSiteAllowed: boolean('on_site_allowed'),
    isNewUser: boolean('is_new_user'),
    haveLaptop: boolean('have_laptop'),
    isProfileCompleted: boolean('is_profile_completed'),
    phoneVerificationToken: varchar('phone_verification_token', {
        length: 2000
    }),
    phoneVerified: boolean('phone_verified'),
    isDocumentUploaded: boolean('is_document_uploaded'),
    createdOn: timestamp('created_date').defaultNow(),
    updatedOn: timestamp('updated_date'),
    updatedBy: timestamp('update_by')
});

export const studentRelation = relations(regStudents, ({ many }) => ({
    studentDocuments: many(studentDocuments)
}));

export const studentDocuments = pgTable('student_documents', {
    stDocId: serial('st_doc_id').primaryKey(),
    //studentId: number()
    documentName: varchar('document_name', {
        length: 100
    }),
    documentUrl: varchar('document_url', {
        length: 200
    })
});


export const studentCourses = pgTable('studentCourses', {
    studentCourseId: serial('studentCourseId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    batchCourseId: integer('batchCourseId').references(() => batchCourses.batchCourseId),
    currentlyOnsite: boolean('currentlyOnsite'),
    isGraduated: boolean('isGraduated'),
    isActive: boolean('isActive'),
    isDropout: boolean('isDropout'),
    registrationDate: date('registrationDate'),
    graduationDate: date('graduationDate'),
    dropoutDate: date('dropoutDate'),
    dropOutReason: varchar('dropOutReason', {
        length: 200
    }),
    courseStatus: varchar('courseStatus', {
        length: 50
    }),
    currentQtr: varchar('currentQtr', {
        length: 20
    }),
    completedQtrs: text('completedQtrs').array(),
    createdOn: timestamp('createdOn').defaultNow(),
    createdBy: integer('createdBy'),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')
})


export const statusLog = pgTable('statusLog', {
    statusLogId: serial('statusLogId').primaryKey(),
    studentCourseId: integer('studentCourseId').references(() => studentCourses.studentCourseId),
    status: varchar('status', {
        length: 50
    }),
    statusDesc: varchar('statusDesc', {
        length: 500
    }),
    statusDate: timestamp('statusDate').defaultNow(),
});


export const documentRelation = relations(studentDocuments, ({ one }) => ({
    studentDocument: one(regStudents, {
        fields: [studentDocuments.stDocId],
        references: [regStudents.studentId]
    })
}));

export const batches = pgTable('batches', {
    batchId: serial('batchId').primaryKey(),
    batchName: varchar('batchName', {
        length: 50
    }),
    isRegistrationActive: boolean('isRegistrationActive'),
    cityId: integer('cityId').references(() => cities.cityId),
    isBatchActive: boolean('isBatchActive'),
    isActive: boolean('isActive'),
    regStartDate: date('regStartDate'),
    regEndDate: date('regEndDate'),
    batchEndDate: date('batchEndDate'),
    isRestricted: boolean('isRestricted'),
    isEntryTestMandatory: boolean('isEntryTestMandatory')
})

export const batchConfig = pgTable('batchConfig', {
    batchConfigId: serial('batchConfigId').primaryKey(),
    batchId: integer('batchId').references(() => batches.batchId),
    instructionsForMale: text('instructionsForMale').array(),
    instructionsForFemale: text('instructionsForFemale').array(),
    admitCardMessage: varchar('admitCardMessage', {
        length: 1000
    }),
    attestationDate: date('attestationDate'),
    entryTestDate: date('entryTestDate'),
    createdOn: date('createdOn').defaultNow()
})


export const courses = pgTable('courses', {
    courseId: serial('course_id').primaryKey(),
    courseName: varchar('course_name', {
        length: 200
    }),
    inital: varchar('inital', {
        length: 200
    }),
    longDescription: varchar('long_description', {
        length: 3000
    }),
    shortDescription: varchar('short_description', {
        length: 1500
    }),
    createdOn: date('created_on').defaultNow()
})


export const batchCourses = pgTable('batchCourses', {
    batchCourseId: serial('batchCourseId').primaryKey(),
    batchId: integer('batchId').references(() => batches.batchId),
    courseId: integer('courseId').references(() => courses.courseId),
})

export const quarters = pgTable('quarters', {
    quarterId: serial('quarterId').primaryKey(),
    quarterName: varchar('quarterName', {
        length: 50
    }).notNull(),
    createdOn: timestamp('createdOn').defaultNow()
});

export const batchQuarters = pgTable('batchQuarters', {
    batchQuarterId: serial('batchQuarterId').primaryKey(),
    quarterId: integer('quarterId').references(() => quarters.quarterId),
    batchCourseId: integer('batchCourseId').references(() => batchCourses.batchCourseId),
    isClassStarted: boolean('isClassStarted'),
    isRegistrationActive: boolean('isRegistrationActive'),
    isClassCompleted: boolean('isClassCompleted'),
    isActive: boolean('isActive').default(false),
    regStartDate: date('regStartDate'),
    regEndDate: date('regEndDate'),
    classStartDate: date('classStartDate'),
    classEndDate: date('classEndDate'),
    createdOn: timestamp('createdOn').defaultNow()
});


export const emailRecords = pgTable('emailRecords', {
    emailRecordId: serial('emailRecordId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    email: varchar('email', {
        length: 200
    }),
    isEmailSent: boolean('isEmailSent').default(false),
    createdOn: timestamp('createdOn').defaultNow()
})

export const entryTests = pgTable('entryTests', {
    entryTestId: serial('entryTestId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    batchId: integer('batchId').references(() => batches.batchId),
    percentile: decimal('percentile', { precision: 2 }),
    rank: integer('rank'),
    testDate: date('testDate'),
    testPassed: boolean('testPassed').default(false),
    createdOn: timestamp('createdOn').defaultNow(),
    createdBy: integer('createdBy'),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')
});

export const timeSlots = pgTable('timeSlots', {
    timeSlotId: serial('timeSlotId').primaryKey(),
    slotName: varchar('slotName', {
        length: 100
    }).notNull(),
    centerId: integer('centerId').references(() => centers.centerId),
    batchQuarterId: integer('batchQuarterId').references(() => batchQuarters.batchQuarterId),
    location: varchar('location', {
        length: 100
    }),
    qtrFee: decimal('qtrFee', { precision: 2 }),
    slotYear: integer('slotYear'),
    slotMonth: integer('slotMonth'),
    slotDay: integer('slotDay'),
    slotStart: time('slotStart'),
    slotEnd: time('slotEnd'),
    totalSeats: integer('totalSeats'),
    bookedSeats: integer('bookedSeats'),
    confirmedSeats: integer('confirmedSeats'),
    createdOn: timestamp('createdOn').defaultNow()
})