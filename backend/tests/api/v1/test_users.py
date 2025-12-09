# backend/tests/api/v1/test_users.py

from datetime import date, datetime, timezone
from unittest.mock import MagicMock
from uuid import uuid4

import pytest
from fastapi import HTTPException, status
from fastapi.testclient import TestClient

from backend.app.api.v1.users import router
from backend.app.core.dependencies import get_db, get_current_user_id
from backend.app.api.v1.schemas import UserProfileResponse, UserProfileUpdate

# Mock Supabase client
@pytest.fixture
def mock_supabase_client():
    mock_client = MagicMock()
    yield mock_client

# Mock get_db dependency
@pytest.fixture
def mock_get_db(mock_supabase_client):
    def _get_db():
        return mock_supabase_client
    return _get_db

# Mock get_current_user_id dependency
@pytest.fixture
def mock_get_current_user_id():
    def _get_current_user_id():
        return str(uuid4())  # Return a consistent mock user ID for testing
    return _get_current_user_id

# Override dependencies for testing
def override_dependencies(client_fixture, user_id_fixture):
    router.dependency_overrides[get_db] = client_fixture
    router.dependency_overrides[get_current_user_id] = user_id_fixture

# Create test client
@pytest.fixture
def client(mock_get_db, mock_get_current_user_id):
    override_dependencies(mock_get_db, mock_get_current_user_id)
    with TestClient(router) as c:
        yield c
    router.dependency_overrides = {} # Clean up overrides

def as_datetime(value: str) -> datetime:
    if value is None:
        return datetime.now(timezone.utc)
    dt = datetime.fromisoformat(value)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


### Test GET /users/me/cv
def test_get_user_profile_cv_not_found(client, mock_supabase_client):
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[])
    
    response = client.get("/users/me/cv")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == "User profile not found. Please create your profile first."

def test_get_user_profile_cv_success(client, mock_supabase_client, mock_get_current_user_id):
    user_id = mock_get_current_user_id()
    mock_profile_data = {
        "id": str(uuid4()),
        "user_id": user_id,
        "full_name": "Test User",
        "date_of_birth": "2000-01-01",
        "gender": "male",
        "phone_number": "1234567890",
        "address": "123 Test St",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    mock_cv_data = {
        "id": str(uuid4()),
        "user_id": user_id,
        "cv_full_text": "My awesome CV content",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[mock_profile_data])
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[mock_cv_data])

    response = client.get("/users/me/cv")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["full_name"] == mock_profile_data["full_name"]
    assert data["cv_content"] == mock_cv_data["cv_full_text"]
    assert as_datetime(data["created_at"]).date() == as_datetime(mock_cv_data["created_at"]).date()
    assert as_datetime(data["updated_at"]).date() == as_datetime(mock_cv_data["updated_at"]).date()


### Test PATCH /users/me/cv (Comprehensive)
def test_patch_user_profile_cv_no_fields_provided(client, mock_supabase_client):
    response = client.patch("/users/me/cv", json={})
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "No fields provided for update."

@pytest.mark.parametrize("field, value, expected_detail", [
    ("full_name", "", "'full_name' cannot be empty."),
    ("gender", "", "'gender' cannot be empty."),
    ("phone_number", "", "'phone_number' cannot be empty."),
    ("address", "", "'address' cannot be empty."),
    ("cv_full_text", "", "'cv_full_text' cannot be empty."),
])
def test_patch_user_profile_cv_empty_string_validation(client, mock_supabase_client, field, value, expected_detail):
    user_id = str(uuid4())
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[{"user_id": user_id, "full_name": "Existing User", "date_of_birth": "2000-01-01", "gender": "male", "phone_number": "123", "address": "abc"}])
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[{"user_id": user_id, "cv_full_text": "Existing CV"}])
    
    response = client.patch("/users/me/cv", json={field: value})
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == expected_detail

def test_patch_user_profile_cv_profile_not_found_on_profile_update(client, mock_supabase_client):
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[]) # No profile
    
    response = client.patch("/users/me/cv", json={"full_name": "Updated Name"})
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == "User profile not found after update." # The final GET for UserProfileResponse will fail

def test_patch_user_profile_cv_cv_not_found_on_cv_update(client, mock_supabase_client):
    user_id = str(uuid4())
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[{"user_id": user_id, "full_name": "Existing User", "date_of_birth": "2000-01-01", "gender": "male", "phone_number": "123", "address": "abc"}])
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[]) # No CV
    
    response = client.patch("/users/me/cv", json={"cv_full_text": "Updated CV"})
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == "CV not found for this user. Please create your CV first."

def test_patch_user_profile_cv_partial_profile_update_success(client, mock_supabase_client, mock_get_current_user_id):
    user_id = mock_get_current_user_id()
    current_time = datetime.now(timezone.utc)
    mock_profile_data = {
        "id": str(uuid4()), "user_id": user_id, "full_name": "Old Name", "date_of_birth": "2000-01-01", 
        "gender": "male", "phone_number": "123", "address": "abc", "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }
    mock_cv_data = {
        "id": str(uuid4()), "user_id": user_id, "cv_full_text": "Existing CV", 
        "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }

    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[mock_profile_data])
    mock_supabase_client.table("profiles").update().eq().execute.return_value = MagicMock(data=[{**mock_profile_data, "full_name": "New Name", "updated_at": current_time.isoformat()}]) # Mock updated profile
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[mock_cv_data]) # CV data not changed here

    response = client.patch("/users/me/cv", json={"full_name": "New Name"})
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["full_name"] == "New Name"
    assert data["cv_content"] == "Existing CV" # CV content should be unchanged
    mock_supabase_client.table("profiles").update.assert_called_once()
    assert mock_supabase_client.table("profiles").update.call_args.args[0]["full_name"] == "New Name"
    assert "updated_at" in mock_supabase_client.table("profiles").update.call_args.args[0]
    mock_supabase_client.table("cv_documents").update.assert_not_called()

def test_patch_user_profile_cv_partial_cv_update_success(client, mock_supabase_client, mock_get_current_user_id):
    user_id = mock_get_current_user_id()
    current_time = datetime.now(timezone.utc)
    mock_profile_data = {
        "id": str(uuid4()), "user_id": user_id, "full_name": "Existing User", "date_of_birth": "2000-01-01", 
        "gender": "male", "phone_number": "123", "address": "abc", "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }
    mock_cv_data = {
        "id": str(uuid4()), "user_id": user_id, "cv_full_text": "Old CV Content", 
        "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }

    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[mock_profile_data])
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[mock_cv_data])
    mock_supabase_client.table("cv_documents").update().eq().execute.return_value = MagicMock(data=[{**mock_cv_data, "cv_full_text": "New CV Content", "updated_at": current_time.isoformat()}]) # Mock updated CV

    response = client.patch("/users/me/cv", json={"cv_full_text": "New CV Content"})
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["full_name"] == "Existing User" # Profile content should be unchanged
    assert data["cv_content"] == "New CV Content"
    mock_supabase_client.table("cv_documents").update.assert_called_once()
    assert mock_supabase_client.table("cv_documents").update.call_args.args[0]["cv_full_text"] == "New CV Content"
    assert "updated_at" in mock_supabase_client.table("cv_documents").update.call_args.args[0]
    mock_supabase_client.table("profiles").update.assert_not_called()

def test_patch_user_profile_cv_full_update_success(client, mock_supabase_client, mock_get_current_user_id):
    user_id = mock_get_current_user_id()
    current_time = datetime.now(timezone.utc)
    mock_profile_data = {
        "id": str(uuid4()), "user_id": user_id, "full_name": "Old Name", "date_of_birth": "2000-01-01", 
        "gender": "male", "phone_number": "123", "address": "abc", "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }
    mock_cv_data = {
        "id": str(uuid4()), "user_id": user_id, "cv_full_text": "Old CV Content", 
        "created_at": current_time.isoformat(), "updated_at": current_time.isoformat()
    }

    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[mock_profile_data])
    mock_supabase_client.table("profiles").update().eq().execute.return_value = MagicMock(data=[{**mock_profile_data, "full_name": "New Name", "gender": "female", "updated_at": current_time.isoformat()}])
    
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[mock_cv_data])
    mock_supabase_client.table("cv_documents").update().eq().execute.return_value = MagicMock(data=[{**mock_cv_data, "cv_full_text": "New CV Content", "updated_at": current_time.isoformat()}])

    response = client.patch("/users/me/cv", json={
        "full_name": "New Name",
        "gender": "female",
        "cv_full_text": "New CV Content"
    })
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["full_name"] == "New Name"
    assert data["gender"] == "female"
    assert data["cv_content"] == "New CV Content"
    mock_supabase_client.table("profiles").update.assert_called_once()
    mock_supabase_client.table("cv_documents").update.assert_called_once()
    assert mock_supabase_client.table("profiles").update.call_args.args[0]["full_name"] == "New Name"
    assert mock_supabase_client.table("profiles").update.call_args.args[0]["gender"] == "female"
    assert "updated_at" in mock_supabase_client.table("profiles").update.call_args.args[0]
    assert mock_supabase_client.table("cv_documents").update.call_args.args[0]["cv_full_text"] == "New CV Content"
    assert "updated_at" in mock_supabase_client.table("cv_documents").update.call_args.args[0]




### Test RLS Considerations (API Test only for Forbidden Access)
# Note: Full RLS verification requires actual Supabase setup and policies.
# This test checks if the API *logic* prevents unauthorized user_id manipulation,
# but doesn't test Supabase's built-in RLS directly.
def test_patch_user_profile_cv_forbidden_different_user(mock_get_db, mock_supabase_client):
    # This test will manually set a different user_id for the current user
    # to simulate trying to update another user's CV via the API.
    # The actual API endpoint uses `get_current_user_id` so this is more of a conceptual test.
    # Supabase RLS would typically handle this before it even reaches the update logic.

    # Mock a different user ID for the current authenticated user
    def mock_different_user_id():
        return str(uuid4())

    override_dependencies(mock_get_db, mock_different_user_id)
    client_different_user = TestClient(router)

    user_id_from_auth = mock_different_user_id() # This is the "authenticated" user
    target_user_id = str(uuid4()) # This is the user whose profile/CV we are trying to update (should be different)

    # Mock an existing CV for the *target* user (to satisfy checks within the PATCH endpoint)
    mock_supabase_client.table("cv_documents").select().eq().limit().execute.return_value = MagicMock(data=[{"id": str(uuid4()), "user_id": target_user_id, "cv_full_text": "target user's CV"}])
    mock_supabase_client.table("profiles").select().eq().limit().execute.return_value = MagicMock(data=[{"user_id": target_user_id, "full_name": "Target User", "date_of_birth": "2000-01-01", "gender": "female", "phone_number": "0987654321", "address": "456 Target Rd", "created_at": datetime.now(timezone.utc).isoformat(), "updated_at": datetime.now(timezone.utc).isoformat()}])
    
    # Mock that the update *would* succeed if the user_id matched (but it shouldn't be called if RLS works)
    mock_supabase_client.table("cv_documents").update().eq().execute.return_value = MagicMock(data=[{"id": str(uuid4()), "user_id": target_user_id, "cv_full_text": "updated target CV"}])
    mock_supabase_client.table("profiles").update().eq().execute.return_value = MagicMock(data=[{"id": str(uuid4()), "user_id": target_user_id, "full_name": "Updated Target User"}])


    # The API code relies on get_current_user_id() in the .eq() filter.
    # So, if we try to update another user's CV, the .eq("user_id", user_id_from_auth) will correctly filter it out.
    # If we try to update cv_full_text, we expect a 404 NOT FOUND because no CV will be found matching user_id_from_auth.
    response = client_different_user.patch("/users/me/cv", json={"cv_full_text": "Malicious update"})
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == "CV not found for this user. Please create your CV first."
    
    # If we try to update a profile field, we expect a 404 NOT FOUND because no Profile will be found matching user_id_from_auth.
    response = client_different_user.patch("/users/me/cv", json={"full_name": "Malicious Name Update"})
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["detail"] == "User profile not found after update." # Matches the detail from when profile is not found on a profile update.

