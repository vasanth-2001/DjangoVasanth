# Generated by Django 3.2.19 on 2025-02-08 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('room_type', models.CharField(choices=[('hotel', 'Hotel'), ('villa', 'Villa'), ('apartment', 'Apartment')], default='hotel', max_length=50)),
                ('availability', models.CharField(choices=[('available', 'Available'), ('unavailable', 'Unavailable')], default='available', max_length=50)),
                ('image_url', models.URLField(max_length=2000)),
                ('description', models.TextField()),
                ('city', models.CharField(max_length=100)),
            ],
        ),
    ]
