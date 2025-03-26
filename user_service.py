from firebase_config import db
from user import User
import traceback

def save_user(user: User):
    try:
        print(f"Saving user: {user}")
        db.collection("users").document(user.user_id).set(user.to_dict())
        print("✅ User saved to Firestore!")
    except Exception as e:
        print("❌ Failed to save user:", e)
        traceback.print_exc()

def get_user(user_id: str) -> User | None:
    try:
        print(f"Fetching user with ID: {user_id}")
        doc = db.collection("users").document(user_id).get()
        if doc.exists:
            data = doc.to_dict()
            print("✅ User fetched:", data)
            return User(**data)
        else:
            print("⚠️ No user found with ID:", user_id)
            return None
    except Exception as e:
        print("❌ Failed to fetch user:", e)
        traceback.print_exc()
        return None
