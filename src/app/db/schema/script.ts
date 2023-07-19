import { relations } from 'drizzle-orm';
import { serial, varchar, timestamp, date, pgTable, integer, boolean, decimal, text, time } from 'drizzle-orm/pg-core';



export const roles = pgTable('roles', {
    roleId: serial('roleId').primaryKey(),
    roleName: varchar('roleName', {
        length: 50
    }),
    createdOn: timestamp('createdOn').defaultNow()
})

export const users = pgTable('users', {
    userId: serial('userId').primaryKey(),
    userName: varchar('userName', {
        length: 500
    }),
    cnic: varchar('cnic', {
        length: 50
    }),
    password: varchar('password', {
        length: 3000
    }),
    emailVerificationToken: varchar('emailVerificationToken', {
        length: 3000
    }),
    emailVerified: boolean('emailVerified'),
    isActive: boolean('isActive'),

    //currently setting user with role as user would have only one role (it could be one to many)
    roleId: integer('roleId').references(() => roles.roleId),
    status: varchar('status', {
        length: 50
    }),
    isBlocked: boolean('isBlocked'),
    blockReason: varchar('blockReason', {
        length: 1000
    }),
    createdOn: timestamp('createdOn').defaultNow(),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')

});

export const cities = pgTable('cities', {
    cityId: serial('cityId').primaryKey(),
    cityName: varchar('cityName', {
        length: 200
    }).notNull(),
    createdOn: timestamp('createdOn').defaultNow()
});




export const centers = pgTable('centers', {
    centerId: serial('centerId').primaryKey(),
    centerName: varchar('centerName', {
        length: 200
    }),
    campus: varchar('campus', {
        length: 200
    }),
    cityId: integer('cityId').references(() => cities.cityId),
    location: varchar('location', {
        length: 300
    }),
    createdOn: timestamp('createdOn').defaultNow()

});


export const regStudents = pgTable('regStudents', {
    studentId: serial('studentId').primaryKey(),
    userId: integer('userId').references(() => users.userId),
    fullName: varchar('fullName', {
        length: 100,
    }),
    dob: date('dob'),
    gender: varchar('gender', {
        length: 10
    }),
    contactNo: varchar('contactNo', {
        length: 50
    }),
    lastQualification: varchar('lastQualification', {
        length: 50
    }),
    homeAddress: varchar('homeAddress', {
        length: 500
    }),
    imgUrl: varchar('imgUrl', {
        length: 200
    }),
    cityId: integer('cityId').references(() => cities.cityId),
    distanceLearning: boolean('distanceLearning'),
    rollInternal: varchar('rollInternal', {
        length: 20
    }),
    rollNo: varchar('rollNo', {
        length: 20
    }),
    status: varchar('status', {
        length: 20
    }),
    rejectReason: varchar('rejectReason', {
        length: 200
    }),
    signUpDate: date('signUpDate'),
    entryTestResult: varchar('entryTestResult', {
        length: 200
    }),
    studentRefId: integer('studentRefId'),
    percentile: decimal('percentile', {
        precision: 3
    }),
    rank: integer('rank'),
    onSiteAllowed: boolean('onSiteAllowed'),
    isNewUser: boolean('isNewUser'),
    haveLaptop: boolean('haveLaptop'),
    isProfileCompleted: boolean('isProfileCompleted'),
    phoneVerificationToken: varchar('phoneVerificationToken', {
        length: 2000
    }),
    phoneVerified: boolean('phoneVerified'),
    isDocumentUploaded: boolean('isDocumentUploaded'),
    createdOn: timestamp('createdOn').defaultNow(),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')
});

export const studentRelation = relations(regStudents, ({ many }) => ({
    studentDocuments: many(studentDocuments)
}));

export const studentDocuments = pgTable('studentDocuments', {
    stDocId: serial('stDocId').primaryKey(),
    //studentId: number()
    documentName: varchar('documentName', {
        length: 100
    }),
    documentUrl: varchar('documentUrl', {
        length: 200
    }),
    createdOn: timestamp('createdOn').defaultNow()
});


export const studentCourses = pgTable('studentCourses', {
    studentCourseId: serial('studentCourseId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    batchCourseId: integer('batchCourseId').references(() => batchCourses.batchCourseId),
    currentlyOnsite: boolean('currentlyOnsite'),
    batchQuarterId: integer('batchQuarterId').references(() => batchQuarters.batchQuarterId),
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
    isEntryTestMandatory: boolean('isEntryTestMandatory'),
    createdOn: timestamp('createdOn').defaultNow()
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
    createdOn: timestamp('createdOn').defaultNow(),
})


export const courses = pgTable('courses', {
    courseId: serial('courseId').primaryKey(),
    courseName: varchar('courseName', {
        length: 200
    }),
    inital: varchar('inital', {
        length: 200
    }),
    longDescription: varchar('longDescription', {
        length: 3000
    }),
    shortDescription: varchar('shortDescription', {
        length: 1500
    }),
    createdOn: timestamp('createdOn').defaultNow(),
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


export const banks = pgTable('banks', {
    bankId: serial('bankId').primaryKey(),
    bankCode: varchar('bankCode', {
        length: 5
    }),
    bankName: varchar('bankName', {
        length: 100
    }),
    createdOn: timestamp('createdOn').defaultNow()
})

export const branches = pgTable('branches', {
    branchId: serial('branchId').primaryKey(),
    bankId: integer('bankId').references(() => banks.bankId),
    cityId: integer('cityId').references(() => cities.cityId),
    branchCode: varchar('branchCode', {
        length: 5
    }),
    branchName: varchar('branchName', {
        length: 100
    }),
    branchAddress: varchar('branchAddress', {
        length: 500
    }),
    createdOn: timestamp('createdOn').defaultNow()
})

export const feeVouchers = pgTable('feeVouchers', {

    feeVoucherId: serial('feeVoucherId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    feeVoucherNo: varchar('feeVoucherNo', {
        length: 20,
    }),
    // batchCourseId: integer('batchCourseId').references(()=>batchCourses.batchCourseId),
    batchQuarterId: integer('batchQuarterId').references(() => batchQuarters.batchQuarterId),
    timeSlotId: integer('timeSlotId').references(() => timeSlots.timeSlotId),
    distanceLearning: boolean('distanceLearning'),
    isPaid: boolean('isPaid'),
    imgUrl: varchar('imgUrl', {
        length: 250,
    }),
    paymentDeadline: date('paymentDeadline'),
    feeAmount: decimal('feeAmount', { precision: 2 }),
    isValid: boolean('isValid'),
    paymentId: integer('paymentId'),
    paidDate: date('paidDate'),
    branchId: integer('branchId').references(() => branches.branchId),
    isAutoPaid: boolean('isAutoPaid'),
    isPaymentDelayed: boolean('isPaymentDelayed'),
    paymentDelayReason: varchar('paymentDelayReason', {
        length: 500,
    }),
    createdOn: timestamp('createdOn').defaultNow(),
    createdBy: integer('createdBy'),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')
})

export const feeVouchersActivity = pgTable('feeVouchersActivity', {
    voucherActivityId: serial('voucherActivityId').primaryKey(),
    feeVoucherId: integer('feeVoucherId').references(() => feeVouchers.feeVoucherId),
    stepNo: integer('stepNo'),
    tableName: varchar('tableName', {
        length: 500,
    }),
    errorDtls: varchar('errorDtls', {
        length: 500,
    }),
    createdOn: timestamp('createdOn').defaultNow(),
})


export const announcements = pgTable('announcements', {
    announcementId: serial('announcementId').primaryKey(),
    title: varchar('title', {
        length: 200,
    }),
    description: varchar('description', {
        length: 2000,
    }),
    url: varchar('url', {
        length: 500,
    }),
    createdOn: timestamp('createdOn').defaultNow(),
    createdBy: integer('createdBy')
})

export const studentsQtrResult = pgTable('studentQtrResults', {
    studentsQtrRsltId: serial('studentQtrRsltId').primaryKey(),
    studentId: integer('studentId').references(() => regStudents.studentId),
    batchQuarterId: integer('batchQuarterId').references(() => batchQuarters.batchQuarterId),
    isPassed: boolean('isPassed'),
    percentile: decimal('percentile', { precision: 2 }),
    distanceLearning: boolean('distanceLearning').default(false),
    grade: varchar('grade', { length: 5 }),
    testsMissed: integer('testsMissed'),
    rank: integer('rank'),
    createdOn: timestamp('createdOn').defaultNow(),
    createdBy: integer('createdBy'),
    updatedOn: timestamp('updatedOn'),
    updatedBy: timestamp('updatedBy')
})