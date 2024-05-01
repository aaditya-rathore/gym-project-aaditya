import supabase from "./supabase";

export async function login(){
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if(error) {
      throw new Error(error.message);
  }
  console.log(data);
  return data;
}