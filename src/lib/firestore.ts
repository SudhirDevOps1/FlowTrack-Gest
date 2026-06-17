import { collection, doc, setDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { StudySession, Subject } from "@/types/models";

// Fetch all user data
export async function fetchUserData(uid: string) {
  if (!db || !uid) return { subjects: [], sessions: [], settings: {} };

  try {
    const subjectsSnap = await getDocs(collection(db, `users/${uid}/subjects`));
    const subjects = subjectsSnap.docs.map(doc => doc.data() as Subject);

    const sessionsSnap = await getDocs(collection(db, `users/${uid}/sessions`));
    const sessions = sessionsSnap.docs.map(doc => doc.data() as StudySession);

    const settingsSnap = await getDoc(doc(db, `users/${uid}/settings`, "core"));
    const settings = settingsSnap.exists() ? settingsSnap.data() : {};

    return { subjects, sessions, settings };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { subjects: [], sessions: [], settings: {} };
  }
}

// Session Operations
export async function saveSession(uid: string, session: StudySession) {
  if (!db || !uid) return;
  await setDoc(doc(db, `users/${uid}/sessions`, session.id), session);
}

export async function updateSession(uid: string, sessionId: string, updates: Partial<StudySession>) {
  if (!db || !uid) return;
  await setDoc(doc(db, `users/${uid}/sessions`, sessionId), updates, { merge: true });
}

export async function deleteSession(uid: string, sessionId: string) {
  if (!db || !uid) return;
  await deleteDoc(doc(db, `users/${uid}/sessions`, sessionId));
}

export async function bulkSaveSessions(uid: string, sessions: StudySession[]) {
  if (!db || !uid) return;
  const promises = sessions.map(session => saveSession(uid, session));
  await Promise.all(promises);
}

export async function clearAllSessions(uid: string) {
  if (!db || !uid) return;
  const snap = await getDocs(collection(db, `users/${uid}/sessions`));
  const promises = snap.docs.map(d => deleteDoc(d.ref));
  await Promise.all(promises);
}

// Subject Operations
export async function saveSubject(uid: string, subject: Subject) {
  if (!db || !uid) return;
  await setDoc(doc(db, `users/${uid}/subjects`, subject.id), subject);
}

export async function deleteSubject(uid: string, subjectId: string) {
  if (!db || !uid) return;
  await deleteDoc(doc(db, `users/${uid}/subjects`, subjectId));
}

export async function bulkSaveSubjects(uid: string, subjects: Subject[]) {
  if (!db || !uid) return;
  const promises = subjects.map(subject => saveSubject(uid, subject));
  await Promise.all(promises);
}

export async function clearAllSubjects(uid: string) {
  if (!db || !uid) return;
  const snap = await getDocs(collection(db, `users/${uid}/subjects`));
  const promises = snap.docs.map(d => deleteDoc(d.ref));
  await Promise.all(promises);
}

// Settings Operations
export async function saveSetting(uid: string, key: string, value: any) {
  if (!db || !uid) return;
  await setDoc(doc(db, `users/${uid}/settings`, "core"), { [key]: value }, { merge: true });
}

export async function clearAllSettings(uid: string) {
  if (!db || !uid) return;
  await deleteDoc(doc(db, `users/${uid}/settings`, "core"));
}
