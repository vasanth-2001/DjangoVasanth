# booking/models.py
from django.db import models
from django.conf import settings # Import settings to reference User model

class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings') # Use settings.AUTH_USER_MODEL
    room = models.ForeignKey('room.Room', on_delete=models.CASCADE, related_name='bookings') # Reference Room model using 'room.Room'
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Booking for {self.room.title} by {self.user.username}"