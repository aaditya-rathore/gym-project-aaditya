import supabase from "./supabase";

export async function getUsers() {
    
const { data, error } = await supabase
.from('User')
.select('*')
if(error) {
    console.error( error);
    throw new Error('User unable to fetch');
    }
    return data;
}