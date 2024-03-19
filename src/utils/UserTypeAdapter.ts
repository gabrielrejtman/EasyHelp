export const handleUserType = (user_type:string) =>{
    switch(user_type){
        case 'SUPERVISOR':
            return "Supervisor"
        case 'SPECIALIST':
            return "Técnico"
        case 'ADMIN':
            return "Administrador"
    }
}