from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
import re
from django.db.models import Q

@api_view(['POST'])
def signup(request):
    print("[SIGNUP] Incoming data:", request.data)  # Log incoming data
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if not username or not email or not password:
        print("[SIGNUP] Missing fields:", {'username': username, 'email': email, 'password': bool(password)})
        return Response({'error': 'All fields required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        print(f"[SIGNUP] Username already exists: {username}")
        return Response({'error': 'Username already exists'}, status=status.HTTP_409_CONFLICT)
    if User.objects.filter(email=email).exists():
        print(f"[SIGNUP] Email already exists: {email}")
        return Response({'error': 'Email already exists'}, status=status.HTTP_409_CONFLICT)
    # Password strictness
    if not re.match(r"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$", password):
        print(f"[SIGNUP] Password does not meet requirements for: {email}")
        return Response({'error': 'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, email=email, password=password)
    print(f"[SIGNUP] User created: {username} ({email})")
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({'message': 'Login successful', 'user': UserSerializer(user).data})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    exists = User.objects.filter(email=email).exists()
    return Response({'exists': exists}, status=status.HTTP_200_OK)

@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'No user with this email'}, status=status.HTTP_404_NOT_FOUND)
    if not re.match(r"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?]).{8,}$", password):
        return Response({'error': 'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(password)
    user.save()
    return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def check_clone_name(request):
    name = request.data.get('name')
    if not name:
        return Response({'error': 'Name is required'}, status=status.HTTP_400_BAD_REQUEST)
    exists = User.objects.filter(username=name).exists()
    suggestions = []
    if exists:
        # Suggest up to 3 alternatives
        for i in range(2, 10):
            alt = f"{name}{i}"
            if not User.objects.filter(username=alt).exists():
                suggestions.append(alt)
            if len(suggestions) >= 3:
                break
    return Response({'exists': exists, 'suggestions': suggestions}, status=status.HTTP_200_OK)

@api_view(['POST'])
def set_clone_name(request):
    email = request.data.get('email')
    clone_name = request.data.get('clone_name')
    if not email or not clone_name:
        return Response({'error': 'Email and clone_name are required'}, status=status.HTTP_400_BAD_REQUEST)
    from .models import Profile
    from django.contrib.auth.models import User
    if Profile.objects.filter(clone_name=clone_name).exists():
        return Response({'error': 'Name already taken'}, status=status.HTTP_409_CONFLICT)
    try:
        user = User.objects.get(email=email)
        user.profile.clone_name = clone_name
        user.profile.save()
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'message': 'Clone name set successfully', 'clone_name': clone_name}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_clone_name(request):
    email = request.GET.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    from django.contrib.auth.models import User
    try:
        user = User.objects.get(email=email)
        clone_name = user.profile.clone_name
        return Response({'clone_name': clone_name}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({'error': 'Profile or clone name not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def get_email(request):
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
    from django.contrib.auth.models import User
    try:
        user = User.objects.get(username=username)
        return Response({'email': user.email}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
