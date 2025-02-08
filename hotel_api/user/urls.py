# user/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet) # /api/users/

urlpatterns = [
    path('', include(router.urls)),
    # path('register',RegisterUserAPIView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # /api/users/login/
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # /api/users/login/refresh/
]