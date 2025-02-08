# booking/admin.py
from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'room', 'check_in', 'check_out', 'guests', 'total_amount') # Customize display
    list_filter = ('check_in', 'check_out', 'room__room_type') # Filters
    search_fields = ('user__username', 'room__title', 'room__city') # Searchable fields