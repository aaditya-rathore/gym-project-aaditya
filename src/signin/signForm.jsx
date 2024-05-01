import { useState } from "react";
import { Form } from "react-hook-form";
import {FormEvent}from "react"
import FormRowVertical from "./FormRowVertical";

function SignIn(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    
const handleSubmit=(e)=>{
    e.preventDefault();
    if(!email || !password){
        return;
    }
    SignIn({email,password});
}
    

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <input
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <button size="large">SignIn</button>
            </FormRowVertical>

        </Form>
    );
}