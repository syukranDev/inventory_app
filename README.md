# inventory_app
Local Front Setup: <br/>
> Clone this repo and run `npm install` &  `npm run dev` <br/><br/>

Local Backend Setup: <br/>
> Clone repo `backend-inventoryapp` and run `npm install` & `npm run dev`  <br/><br/>

## PostrgreSQL Schema
```
TBA
```



## Tech Stack
```
Backend: NodeJS, PostgreSQL on Supabase, private VPS.
FrontEnd: NextJS on top of React, ShacdnUI & more..
```

## Test User:
```
Login in 'admin' to get view all the pages available including CRUD screen.
Role Admin (username:password) === admin:test@123 (grants all permission)

Login in 'guest' to get view limited screen available.
Role Guest (username:password) === guest:test@12345 (limited permission)

NOTE: You may create new user or change existing user to test permission features.
```

## Permission:
```
Permission CREATE, VIEW, UPDATE, DELETE applies on both users and inventory data.
>> You may setup accordingly to new user upon user-creation.
```

## Misc:
```
>> Populate Data button can be seen by user with roles = 'admin' only'
>> For the sake of simplicity and time constraint,
   - All backend API is unprotected. No JWT token needed.
   - Password is non-hashed.
   - Static inventory image is used for all data.
   - Sorting is applies to listing API but not in UI. (FIXED, inventory listing UI only)
   - Dark mode & mobile is not maintained, light mode & desktop view is recomendded.
```

## API:
```
API Nodejs Codebase can been seen in repo called `backend-inventoryapp`
>> api/inventory/list
>> api/inventory/o/:id
>> api/inventory/update/:id
>> api/inventory/add
>> api/inventory/delete/:id
>> api/inventory/populate
```

## Unit Test:
```
>> Head into backend_inventoryapp and install jest by `npm i -g jest`
>> Run `jest`
```
![image](https://github.com/syukranDev/inventory_app/assets/51852197/2a0486ed-4bcc-4e97-9256-caeca1c7e02e)



## Screenshot (in order)
![image](https://github.com/syukranDev/inventory_app/assets/51852197/a9d4c6d6-b5a9-4032-99a5-a7cc403f67b7)
<img width="1153" alt="Xnapper-2024-03-01-22 08 20" src="https://github.com/syukranDev/inventory_app/assets/51852197/eb03b486-6aa1-4d85-8116-79639c75512d">
![image](https://github.com/syukranDev/inventory_app/assets/51852197/1449c2ac-183d-47ca-a38b-9884a325bc3d)
![image](https://github.com/syukranDev/inventory_app/assets/51852197/ec74eb79-cf44-4fbd-b34d-d96a0d4e0132)
<img width="1162" alt="Xnapper-2024-03-01-22 09 16" src="https://github.com/syukranDev/inventory_app/assets/51852197/612f5d62-69ad-4081-9f2a-ba33b2ffdc8c">
<img width="1226" alt="Xnapper-2024-03-01-22 10 09" src="https://github.com/syukranDev/inventory_app/assets/51852197/36858407-32a8-42e6-a6cf-ccc4315e6c5f">
<img width="1159" alt="Xnapper-2024-03-01-22 10 47" src="https://github.com/syukranDev/inventory_app/assets/51852197/a3f11e8b-9531-4ede-bf28-82ddfb1a0364">
<img width="1158" alt="Xnapper-2024-03-01-22 11 00" src="https://github.com/syukranDev/inventory_app/assets/51852197/0ce15e36-5e3e-41d6-827d-c8ae66bd56a3">
<img width="1161" alt="Xnapper-2024-03-01-22 11 20" src="https://github.com/syukranDev/inventory_app/assets/51852197/ade93dba-7fd4-46ee-90c5-dfed1c2a5706">
<img width="1158" alt="Xnapper-2024-03-01-22 12 10" src="https://github.com/syukranDev/inventory_app/assets/51852197/14018485-d9de-4614-9133-d62079ca7bd3">
