# booking/serializers.py
from rest_framework import serializers
from .models import Booking
from room.serializers import RoomSerializer # Import RoomSerializer
from user.serializers import UserSerializer # Import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) # Display user details, read-only for creation
    room = RoomSerializer(read_only=True) # Display room details, read-only for creation

    class Meta:
        model = Booking
        fields = '__all__'