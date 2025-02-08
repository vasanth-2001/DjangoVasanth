# room/views.py
from rest_framework import viewsets, permissions
from .models import Room
from .serializers import RoomSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Adjust permissions as needed

    @action(detail=False, methods=['post'])
    def search(self, request):
        queryset = self.queryset
        city = request.data.get('city') # Example search parameter

        if city:
            queryset = queryset.filter(city__icontains=city)

        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)