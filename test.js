

// id String @id @default(uuid()) 
// email String @unique
// firstName String?
// lastName String?
// username String?
// password String 
// professsion String?
// imageUrl String?
// description String? 
// skills String[]
// experience String[]
// contactNo String?



let user = {
    email:"",
    firstName:"",
    lastName:"lastName",
    username:"",
    password:"password",
    profession:""
}

let newUser = {...user};


for(let key in user){

    if(!user[key] || user[key]=="")
        delete newUser[key];
}

console.log(user)
console.log(newUser);