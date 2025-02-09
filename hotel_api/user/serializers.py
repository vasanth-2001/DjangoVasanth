# user/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True, write_only=True) # Add username, allow blank initially
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], style={'input_type': 'password'})
    cPassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    firstName = serializers.CharField(required=True, source='first_name')  # Correct source to 'first_name'
    emailId = serializers.EmailField(required=True, source='email')      # Correct source to 'email'

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'cPassword', 'firstName', 'emailId')
        extra_kwargs = {'password': {'write_only': True, 'style': {'input_type': 'password'}},
                        'cPassword': {'write_only': True, 'style': {'input_type': 'password'}}}

    def validate(self, data):
        if data['password'] != data['cPassword']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('cPassword')

        # Generate username - ensure it's always created and unique
        if 'username' not in validated_data or not validated_data['username']:
            base_username = validated_data.get('firstName', 'user') + validated_data.get('email', '').split('@')[0]
            username = base_username
            suffix = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{suffix}"
                suffix += 1
            validated_data['username'] = username

        user = User.objects.create_user(**validated_data)  # Corrected line: Removed redundant username=...
        return user

    def update(self, instance, validated_data): # Add update method for completeness
        instance.first_name = validated_data.get('firstName', instance.first_name) # Map firstName to first_name
        instance.email = validated_data.get('emailId', instance.email)          # Map emailId to email
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance
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