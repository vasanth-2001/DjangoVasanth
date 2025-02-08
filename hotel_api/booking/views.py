# booking/views.py
from rest_framework import viewsets, permissions
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated] # Only logged-in users can book

    def perform_create(self, serializer): # Automatically set user when creating booking
        serializer.save(user=self.request.user)

    def get_queryset(self): # Optionally filter bookings for current user
        if self.request.user.is_authenticated:
            return Booking.objects.filter(user=self.request.user)
        return Booking.objects.none() # Or return all if admin