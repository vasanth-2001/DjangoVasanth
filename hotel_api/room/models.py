from django.db import models
class Room(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    room_type = models.CharField(max_length=50, choices=[
        ('hotel', 'Hotel'),
        ('villa', 'Villa'),
        ('apartment', 'Apartment'),
    ], default='hotel')
    availability = models.CharField(max_length=50, choices=[
        ('available', 'Available'),
        ('unavailable', 'Unavailable'),
    ], default='available')
    image_url = models.URLField(max_length=2000)
    description = models.TextField()
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.title