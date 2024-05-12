import supabase from "@/scenes/supabase";
import { toast } from "sonner";


export async function login(email: string, password:string) {
const  { data, error } = await supabase.auth.signInWithPassword({
    email, 
    password
  });
  if(error) {

toast.error(error.message);
return {isLoggedIn:false, error};
  }

  toast.success('Logged in successfully');
  return {isLoggedIn: true, data};
}