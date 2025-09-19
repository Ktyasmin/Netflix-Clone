
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCdMLeW5dXXYxRnu4luClwvpZ-yl1NRiMI",
  authDomain: "netflix-clone-a2dc4.firebaseapp.com",
  projectId: "netflix-clone-a2dc4",
  storageBucket: "netflix-clone-a2dc4.firebasestorage.app",
  messagingSenderId: "886111952406",
  appId: "1:886111952406:web:5683d1041501e661669f37",
  measurementId: "G-83J77J1BM7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        })
    }catch(error){

        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}





const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)

    }catch(error){
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
       
     
       
    }
    
}




const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};