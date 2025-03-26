import firebase_admin
from firebase_admin import credentials, firestore
import os
import traceback

try:
    cred = credentials.Certificate("firebase-key.json")  # Make sure this file exists
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print("❌ Firebase initialization failed:", e)
    traceback.print_exc()
    db = None  # So we can still import this module without crashing
