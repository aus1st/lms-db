import {serial,varchar,timestamp,date,pgTable,integer, boolean} from 'drizzle-orm/pg-core';

export const city = pgTable('cities',{
    cityId: serial('city_id').primaryKey(),
    cityName: varchar('city_name',{
        length: 200
    }).notNull(),
    createdOn: timestamp('created_date').defaultNow()
});

export const role = pgTable('roles',{
    roleId: serial('role_id').primaryKey(),
    roleName: varchar('role_name',{
        length: 50
    }),
    createdOn: timestamp('created_date').defaultNow()
})

export const user = pgTable('users',{
    userId: serial('user_id').primaryKey(),
    userName: varchar('user_name',{
        length: 500
    }),
    cnic :varchar('cnic',{
        length: 50
    }),
    password :varchar('password',{
        length: 3000
    }),
    emailVerificationToken :varchar('email_verification_token',{
        length: 3000
    }),
    emailVerified :boolean('email_verfied'),
     isActive :boolean('is_active'), 
    roleId: integer('role_id').references(()=>role.roleId),
    status :varchar('status',{
        length: 50
    }),
    isBlocked :boolean('is_blocked'), 
    blockReason :varchar('block_reason',{
        length: 1000
    }),
    createdOn: timestamp('created_date').defaultNow(),
    updatedOn: timestamp('updated_date'),
    updatedBy: timestamp('update_by')
    
})

export const center = pgTable('centers',{
    centerId: serial('center_id').primaryKey(),
    centerName: varchar('center_name',{
        length: 200
    }),
    campus: varchar('campus',{
        length: 200
    }),
    cityId: integer('city_id').references(()=>city.cityId),
    location: varchar('location',{
        length: 300
    }),
    createdOn: timestamp('created_date').defaultNow()

})