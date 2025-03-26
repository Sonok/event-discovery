from user import User
from user_service import save_user, get_user

def test_save_and_get_user():
    user = User(
        user_id="u123",
        name="Alice Doe",
        email="alice@example.com",
        interests=["tech", "music"]
    )
    save_user(user)
    fetched = get_user("u123")
    print("Returned object:", fetched)
    assert fetched == user, "Fetched user does not match original!"
    print("✅ Test passed!")

if __name__ == "__main__":
    test_save_and_get_user()
