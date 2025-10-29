import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , Alert, Separator, TextInput} from 'react-native';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function ResetarSenha(props){

}