from rest_framework import viewsets, permissions, status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] # Allow anyone to signup

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView): # Use TokenObtainPairView for login
    pass # No need to customize, it provides default token obtain logic
    # Login is handled by JWT TokenObtainPairView (urls.py)




# class RegisterUserAPIView(APIView):
#     """Create User for authentication."""
#     permission_classes = [permissions.AllowAny]
#     serializer_class = RegisterSerializer


#     @swagger_auto_schema(
#         request_body=RegisterSerializer,
#         query_serializer=RegisterSerializer,
#         security=[],
#     )
#     def post(self, request):
#         """Get request data & save."""
#         serializer = RegisterSerializer(data=request.data)

#         if not serializer.is_valid():
#             print(serializer.errors)
#             return Response({
#                 'status':status.HTTP_400_BAD_REQUEST,
#                 'errors':serializer.errors,
#                 'message':'Invalid data'
#             })

#         serializer.save()
#         return Response({
#             'status':status.HTTP_201_CREATED,
#             # 'data':serializer.data,
#             'message':'User added successfully'
#         })