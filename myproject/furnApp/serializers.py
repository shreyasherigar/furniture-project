from rest_framework import serializers
from .models import Register_details,Category,Product_details,Invoice
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import PBKDF2PasswordHasher
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    first_name=serializers.CharField(max_length=200,required=True)
    last_name=serializers.CharField(max_length=200,required=True)
    username=serializers.CharField(max_length=200,required=True)
    email=serializers.EmailField(max_length=100)
    phone=serializers.CharField(max_length=10)
    address=serializers.CharField(max_length=200,required=True)
    password=serializers.CharField(max_length=200,required=True,write_only=True)


    class Meta:
        model=Register_details
        fields = ('__all__')

    def validate_password(self,value):
        value=make_password(value)
        return value
        

    # def validate_password(self, value):
    #     return PBKDF2PasswordHasher().encode(value, salt=None, iterations=100000)        


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=Register_details
        field=['usernamae','password']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_details
        fields = ('id','name','description','noofdays','Category','options','rentalOptions')

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product_details
        fields=('id','name','description','noofdays','Category','options','rentalOptions')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields =('status', 'customer', 'items')

