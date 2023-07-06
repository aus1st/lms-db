import { relations } from 'drizzle-orm';
import { serial, varchar, timestamp, date, pgTable, integer, boolean, decimal } from 'drizzle-orm/pg-core';



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


export const regStudents = pgTable('reg_students',{
    studentId: serial('student_id').primaryKey(),
    user_id: integer('user_id').references(()=>users.userId),
    fullName: varchar('full_name',{
        length: 100,
    }),
    dob: date('dob'),
    gender: varchar('gender',{
        length: 10
    }),
    contactNo: varchar('contact_no',{
        length: 50
    }),
    lastQualification: varchar('last_qualification',{
        length: 50
    }),
    homeAddress: varchar('home_address',{
        length: 500
    }), 
    imgUrl: varchar('image_url',{
        length: 200
    }),
    cityId: integer('city_id').references(()=> cities.cityId),
    distanceLearning: boolean('distance_learning'),
    roll_internal: varchar('roll_internal',{
        length: 20
    }),
    rollNo: varchar('roll_no',{
        length: 20
    }),
    status: varchar('status',{
        length: 20
    }),
    rejectReason: varchar('reject_reason',{
        length: 200
    }),
    signUpDate: date('signup_date'),
    entryTestResult: varchar('entry_test_result',{
        length: 200
    }),
    studentRefId: integer('student_ref_id'),
    percentile: decimal('percentile',{
        precision: 3
    }),
    rank: integer('rank'),
    onSiteAllowed: boolean('on_site_allowed'),
    isNewUser: boolean('is_new_user'),
    haveLaptop: boolean('have_laptop'),
    isProfileCompleted: boolean('is_profile_completed'),
    phoneVerificationToken: varchar('phone_verification_token',{
        length: 2000
    }),
    phoneVerified: boolean('phone_verified'),
    isDocumentUploaded: boolean('is_document_uploaded'),
    createdOn: timestamp('created_date').defaultNow(),
    updatedOn: timestamp('updated_date'),
    updatedBy: timestamp('update_by')
});

export const studentRelation = relations(regStudents,({many})=>({
    studentDocuments:many(studentDocuments)
}));

export const studentDocuments = pgTable('student_documents',{
    stDocId: serial('st_doc_id').primaryKey(),
    //studentId: number()
    documentName: varchar('document_name',{
        length: 100
    }),
    documentUrl: varchar('document_url',{
        length: 200
    })
});

export const documentRelation = relations(studentDocuments,({one})=>({
    studentDocument: one(regStudents, {
        fields: [studentDocuments.stDocId],
        references: [regStudents.studentId]
    })
}));