"use server";

import { auth, db } from "@/firebase/admin";
import { Auth, UserRecord } from "firebase-admin/auth";
import { CollectionReference } from "firebase-admin/firestore";
import { onIdTokenChanged } from "firebase/auth";
import { cookies } from "next/headers";
import { _success } from "zod/v4/core";


const ONE_WEEK=60*60*24*7;

export async function signUp(params:SignUpParams){
    const {uid,name,email}=params;


    try{
        const userRecord=await db.collection("users").doc(uid).get();

        if(userRecord.exists){
            return {
                success:false,
                message:"User already exists.Sign in instead."
            }
        }
        await db.collection("users").doc(uid).set({
            name,email
        })

        return{
            success:true,
            message:"Account created sucessfully! Please login"
        }

    }
    catch(e:any){
        console.error("Error creating user",e);

        if(e.code==="auth/email-already-exists"){
            return{
                success:false,
                message:"This email already in use!"
            }
        }

        return{
            success:false,
            message:"Failed to create account."
        }
    }
}

export async function signIn(params:SignInParams){
    const {email,idToken}=params;

    try{
            const userRecord=await auth.getUserByEmail(email);

            if(!userRecord){
                return{
                    success:false,
                    message:"user does not exist. Create an account instead."
                }
            }

            await setSessionCookie(idToken);
    }
    catch(e){
        console.log(e);

        return{ 
                success:false,
                message:"Failed to log into an account."
        }
    }
}   

export async function setSessionCookie(idToken:string){
    const cookieStore=await cookies();

    const sessionCookie=await auth.createSessionCookie(idToken,{
        expiresIn:ONE_WEEK*1000,
    })

    cookieStore.set('session',sessionCookie,{
        maxAge:ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        path:"/",
        sameSite:"lax"
    })
}
 
export async function getCurrentUser():Promise<User | null>{
    const cookieStore=await cookies();

    const sessionCookie=cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try{
            const decodedClaims=await auth.verifySessionCookie(sessionCookie,true);

            const userRecord=await db.
            collection('users')
            .doc(decodedClaims.uid)
            .get();

            if(!userRecord.exists) return null;


            return{
                ...userRecord.data(),
                id:userRecord.id,
            } as User;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export async function isAuthenicated(){
    const user=await getCurrentUser();


    return !!user  
}