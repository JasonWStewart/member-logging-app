import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore";

// Authentication functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Firestore functions
export const addMembership = async (membershipData) => {
  try {
    const docRef = await addDoc(collection(db, "memberships"), membershipData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getMembershipById = async (id) => {
  const membershipsRef = collection(db, "memberships");
  const q = query(membershipsRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("No such document!");
  }
  return querySnapshot.docs[0];
};

export const checkInMember = async (membershipId) => {
  const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
  const attendanceCollection = `attendance_${today}`;
  const attendanceRef = collection(db, attendanceCollection);
  const q = query(attendanceRef, where("membershipId", "==", membershipId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Already checked in today!");
  }

  const attendanceData = {
    membershipId,
    date: today,
    time: new Date().toLocaleTimeString(),
  };

  try {
    const docRef = await addDoc(attendanceRef, attendanceData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getCheckedInMembers = async () => {
  const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
  const attendanceCollection = `attendance_${today}`;
  const attendanceRef = collection(db, attendanceCollection);
  const querySnapshot = await getDocs(attendanceRef);
  const checkedInMembers = querySnapshot.docs.map((doc) => doc.data().membershipId);

  const membershipsRef = collection(db, "memberships");
  const membershipsSnapshot = await getDocs(membershipsRef);

  const categoryCounts = {
    Youth: 0,
    "Season Ticket": 0,
    Member: 0,
  };

  membershipsSnapshot.forEach((doc) => {
    if (checkedInMembers.includes(doc.id)) {
      const membershipData = doc.data();
      categoryCounts[membershipData.cardType]++;
    }
  });

  return categoryCounts;
};

export const getAllMembers = async () => {
  const membershipsRef = collection(db, "memberships");
  const querySnapshot = await getDocs(membershipsRef);
  const members = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return members;
};
