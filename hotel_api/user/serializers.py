# user/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    firstName = serializers.CharField(write_only=True, required=True) # Accept firstName from frontend
    emailId = serializers.EmailField(write_only=True, required=True)   # Accept emailId from frontend

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'firstName', 'emailId') # Include firstName, emailId in fields
        extra_kwargs = {'password': {'write_only': True, 'style': {'input_type': 'password'}}}

    def create(self, validated_data):
        validated_data['username'] = validated_data.pop('firstName') # Map firstName to username
        validated_data['email'] = validated_data.pop('emailId')     # Map emailId to email
        user = User.objects.create_user(**validated_data)
        return user
# class RegisterSerializer(serializers.ModelSerializer):
#     """RegisterSerializer to create user."""
#     email = serializers.EmailField(
#         required=True,
#         validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(
#         write_only=True, required=True, validators=[validate_password]
#     )
#     password2 = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = User
#         fields = ('username', 'password', 'password2',
#             'email', 'first_name', 'last_name')
#         extra_kwargs = {
#         'first_name': {'required': True},
#         'last_name': {'required': True}
#         }

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError(
#                 {"password": "Password fields didn't match."})
#         return attrs

#     def create(self, validated_data):
#         user = User.objects.create(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user