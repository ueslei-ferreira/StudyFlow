from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['display_name', 'level', 'preferences']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        
        if profile_data:
            profile = instance.profile
            profile.display_name = profile_data.get('display_name', profile.display_name)
            profile.level = profile_data.get('level', profile.level)
            profile.preferences = profile_data.get('preferences', profile.preferences)
            profile.save()
        
        return instance
